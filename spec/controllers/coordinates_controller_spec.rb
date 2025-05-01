require 'rails_helper'

describe Api::V1::CoordinatesController, type: :request do
  describe "create" do
    it "creates a coordinate with valid params" do
      expect {
        post "/api/v1/coordinates/create", params: { coordinate: { character: "John", x: 0.4, y: 0.6 } }
      }.to change(Coordinate, :count).by(1)

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["x"]).to eq(0.4)
    end

    it "doesn't create a coordinate if params are missing" do
      post "/api/v1/coordinates/create", params: { coordinate: { character: nil, x: 0.4, y: 0.6 } }

      expect(response).to have_http_status(:unprocessable_content)
    end
  end
end


describe Api::V1::CoordinatesController do
  describe "checkAnswer" do
  end
end
