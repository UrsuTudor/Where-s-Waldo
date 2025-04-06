class CreateCoordinates < ActiveRecord::Migration[7.2]
  def change
    create_table :coordinates do |t|
      t.string :character, null: false
      t.float :x, null: false
      t.float :y, null: false

      t.timestamps
    end
  end
end
