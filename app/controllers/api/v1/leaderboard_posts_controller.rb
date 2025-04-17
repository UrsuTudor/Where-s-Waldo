class Api::V1::LeaderboardPostsController < ApplicationController
  def index
    scores = LeaderboardPost.all
    render json: scores
  end

  def create
    completion_time = calculate_time()
    score = LeaderboardPost.create!(leaderboard_posts_params.merge(completion_time: completion_time))

    if score
      render json: { message: "Your score has been saved successfully!" }
    else
      render json: score.errors
    end
  end

  def calculate_time
    start_minutes, start_seconds = session[:start_time].split(":").map(&:to_i)
    end_minutes, end_seconds     = session[:end_time].split(":").map(&:to_i)

    completion_time_minutes = ((end_minutes - start_minutes + 60) % 60).to_s.rjust(2, "0")
    completion_time_seconds = ((end_seconds - start_seconds + 60) % 60).to_s.rjust(2, "0")

    "#{completion_time_minutes}:#{completion_time_seconds}"
  end

  private

  def leaderboard_posts_params
    params.require(:leaderboard_post).permit(:username, :user, :completion_time)
  end
end
