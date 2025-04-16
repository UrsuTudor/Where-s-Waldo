class Api::V1::LeaderboardPostsController < ApplicationController
  def index
    scores = LeaderboardPost.all
    render json: scores
  end

  def create
    score = LeaderboardPost.create!(leaderboard_posts_params)

    if score
      render json: { message: "Your score has been saved successfully!" }
    else
      render json: score.errors
    end
  end

  private

  def leaderboard_posts_params
    params.require(:leaderboard_post).permit(:user, :completion_time)
  end
end
