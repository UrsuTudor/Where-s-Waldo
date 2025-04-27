# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

coordinates = [
  { character: 'Waldo', x: 0.404, y: 0.621 },
  { character: 'Wenda', x: 0.293, y: 0.516 },
  { character: 'Odlaw', x: 0.07, y: 0.692 },
  { character: 'Wizard', x: 0.78, y: 0.574 }
]

coordinates.each do |coord_data|
  Coordinate.find_or_create_by(character: coord_data[:character]) do |coord|
    coord.x = coord_data[:x]
    coord.y = coord_data[:y]
  end
end
