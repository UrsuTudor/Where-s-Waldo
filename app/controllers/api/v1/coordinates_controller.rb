class Api::V1::CoordinatesController < ApplicationController
  def create
    coordinate = Coordinate.create!(coordinate_params)

    if coordinate
      render json: coordinate
    else
      render json: coordinate.errors
    end
  end

  def checkAnswer
    @character = getCharacter(params[:id])

    is_valid_answer = valid_answer?(@character, params[:imageBounds], params[:clickCoords])
    update_session(params[:id]) if is_valid_answer

    game_won = game_won? if session[:found_characters]
    session[:found_characters] = [] if game_won

    render json: { is_valid_answer: is_valid_answer, character: @character, game_won: game_won }
  end

  private

  def coordinate_params
    params.require(:coordinate).permit(:character, :x, :y)
  end

  def getCharacter(id)
    @coordinate = Coordinate.find(id)
  end

  def valid_answer?(character, imageBounds, clickCoords)
    character.check_selection_proximity(imageBounds, clickCoords)
  end

  def game_won?
    session[:found_characters].length === 4
  end

  def update_session(id)
    session[:found_characters] ||= []
    session[:found_characters] << id unless session[:found_characters].include?(id)
  end
end
