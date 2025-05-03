Rails.application.routes.draw do
  root "homepage#index"

  namespace :api do
    namespace :v1 do
      post "coordinates/checkAnswer", to: "coordinates#checkAnswer"
      post "coordinates/create"
      post "/time/start_time", to: "time_trackers#start_time"
      post "time/stop_time", to: "time_trackers#end_time"
      post "leaderboard/add_score", to: "leaderboard_posts#create"
      get "leaderboard/scores", to: "leaderboard_posts#top_ten"
    end
  end

  if Rails.env.test?
    namespace :test do
        post "session", to: "test_session#update_session"
    end
  end

  get "/*path" => "homepage#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
end
