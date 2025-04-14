class Api::V1::CoordinatesController < ApplicationController
  def create
    coordinate = Coordinate.create!(coordinate_params)

    if coordinate
      render json: coordinate
    else
      render json: coordinate.errors
    end
  end

  #  todo: find a better way to normalize the criteria used when deciding whether or not the user has clicked on the right spot
  def checkAnswer
    imageBounds = params[:imageBounds]
    position = params[:position]

    @character = getCharacter(params[:id])
    is_valid_answer = @character.check_selection_proximity(imageBounds, position)

    if is_valid_answer
      session[:found_characters] ||= []
      session[:found_characters] << params[:id] unless session[:found_characters].include?(params[:id])
    end

    game_won = checkWin()
    if game_won
      session[:found_characters] = []
    end

    render json: { is_valid_answer: is_valid_answer, character: @character, game_won: game_won }
  end

  private

  def coordinate_params
    params.permit(:id, :imageBounds, :position)
  end

  def getCharacter(id)
    @coordinate = Coordinate.find(id)
  end

  def checkWin
    if session[:found_characters].length === 4
      true
    else
      false
    end
  end
end
