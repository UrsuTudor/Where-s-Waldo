FactoryBot.define do
  factory :leaderboard_post do
    sequence(:user) { |n| "User #{n}" }
    completion_time { 12 }
  end
end
