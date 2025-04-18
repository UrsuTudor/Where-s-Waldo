class Coordinate < ApplicationRecord
  validates :character, presence: true
  validates :x, presence: true
  validates :y, presence: true

  def check_selection_proximity(image_bounds, position)
    normalized_x_criteria = (image_bounds["width"] / 100.0) * 1.5
    normalized_y_criteria = (image_bounds["height"] / 100.0) * 1.5

    close_on_right_bound = self.x - (self.x * image_bounds["width"]) < normalized_x_criteria
    close_on_left_bound  = (self.x * image_bounds["width"]) - position["x"] < normalized_x_criteria
    close_on_bottom_bound = self.y - (self.y * image_bounds["height"]) < normalized_y_criteria
    close_on_top_bound = (self.y * image_bounds["height"]) - position["y"] < normalized_y_criteria

    close_on_bottom_bound &&
      close_on_left_bound &&
      close_on_right_bound &&
      close_on_top_bound
  end
end
