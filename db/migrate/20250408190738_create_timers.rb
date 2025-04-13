class CreateTimers < ActiveRecord::Migration[7.2]
  def change
    create_table :timers do |t|
      t.time :start
      t.time :end

      t.timestamps
    end
  end
end
