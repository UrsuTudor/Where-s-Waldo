class Test::TestSessionController < ApplicationController
  def update_session
    params[:data].each { |key, value | session[key] = value }
    head :ok
  end
end
