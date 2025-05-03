class Api::V1::LeaderboardPostsController < ApplicationController
  def top_ten
    scores = LeaderboardPost.order(:completion_time).limit(10)
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

  private

  def leaderboard_posts_params
    params.require(:leaderboard_post).permit(:user)
  end

  def calculate_time
    start_minutes, start_seconds = session[:start_time].split(":").map(&:to_i)
    end_minutes, end_seconds     = session[:end_time].split(":").map(&:to_i)

    completion_minutes = (end_minutes - start_minutes + 60) % 60
    completion_minutes -= 1 if end_seconds < start_seconds
    completion_seconds = (end_seconds - start_seconds + 60) % 60

    # returning the time in seconds for easier sorting in the leaderboard
    completion_minutes * 60 + completion_seconds
  end
end
