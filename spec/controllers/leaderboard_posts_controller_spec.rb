require 'rails_helper'

describe "LeaderboardPosts API", type: :request do
  before do
    create(:leaderboard_post, user: "First place", completion_time: 12)
    create(:leaderboard_post, user: "Third place", completion_time: 14)
    create(:leaderboard_post, user: "Second place", completion_time: 13)
  end

  describe "top_ten" do
    it "gets an ordered list of scores" do
      get "/api/v1/leaderboard/scores"
      parsed_body = JSON.parse(response.body)

      expect(parsed_body[0]["completion_time"]).to eq(12)
      expect(parsed_body[1]["completion_time"]).to eq(13)
      expect(parsed_body[2]["completion_time"]).to eq(14)
    end
  end

  describe "create" do
    it "creates a valid post if the parameters are given" do
      allow_any_instance_of(Api::V1::LeaderboardPostsController).to receive(:calculate_time).and_return(12)
      expect {
        post "/api/v1/leaderboard/add_score", params: { leaderboard_post: { user: "Dan" } }
      }.to change(LeaderboardPost, :count).by(1)
    end

    it "doesn't create a valid post if the user is missing" do
      allow_any_instance_of(Api::V1::LeaderboardPostsController).to receive(:calculate_time).and_return(12)
      post "/api/v1/leaderboard/add_score", params: { leaderboard_post: { user: nil } }

      expect(response).to have_http_status(:unprocessable_content)
    end
  end

  describe "caluclate_time" do
    it "returns time in seconds based on the times stored in the session" do
      post "/test/session", params: { "data" => {
      "start_time" => "03:51",
      "end_time" => "04:05"
     } }

     post "/api/v1/leaderboard/add_score", params: { leaderboard_post: { user: "Dan" } }

     expect(LeaderboardPost.last.completion_time).to eq(14)
    end
  end
end
