class Coordinate < ApplicationRecord
  validates :character, presence: true
  validates :x, presence: true
  validates :y, presence: true
end
