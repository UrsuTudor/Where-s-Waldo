class LeaderboardPost < ApplicationRecord
  validates :user, presence: true, length: { minimum: 3, maximum: 18 }
  validates :completion_time, presence: true
end
