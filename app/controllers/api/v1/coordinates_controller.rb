class Api::V1::CoordinatesController < ApplicationController
  def create
    coordinate = Coordinate.create!(coordinate_params)

    if coordinate
      render json: coordinate
    else
      render json: coordinate.errors
    end
  end

  def show
    @coordinate = Coordinate.find(params[:id])
    render json: @coordinate
  end

  private

  def coordinate_params
    params.permit(:character, :x, :y)
  end
end
