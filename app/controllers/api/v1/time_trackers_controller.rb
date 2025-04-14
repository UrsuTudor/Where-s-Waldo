class Api::V1::TimeTrackersController < ApplicationController
  def start_time
    time = Time.current.strftime("%M:%S")
    session[:start_time] = time
  end

  def end_time
    time = Time.current.strftime("%M:%S")
    session[:end_time] = time
  end
end
