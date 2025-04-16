class CreateLeaderboardPosts < ActiveRecord::Migration[7.2]
  def change
    create_table :leaderboard_posts do |t|
      t.string :user
      t.integer :completion_time

      t.timestamps
    end
    add_index :leaderboard_posts, :user
  end
end
