require 'rails_helper'

describe "Coordinates API", type: :request do
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

  describe "checkAnswer" do
    before do
      create_list(:coordinate, 4)
    end

    context "when making a correct guess" do
      before do
        post "/test/session", params: { "data" => { "found_characters" => [ 1, 2, 3 ] } }

        post "/api/v1/coordinates/checkAnswer",
        params: { "id" => Coordinate.first.id,
                  "imageBounds" => { "width" => 1415, "height" => 931 },
                  "clickCoords" => { "x" => 572, "y" => 580 }
        }.to_json,
        headers: { "CONTENT_TYPE" => "application/json" }
      end

      it "confirms answer as valid when the user makes a correct guess" do
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["is_valid_answer"]).to be(true)
      end

      it "retrieves the requested character" do
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["character"]["id"]).to eq(Coordinate.first.id)
      end

      it "confirms that the game has been won if 4 characters were found" do
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["game_won"]).to be(true)
      end
    end


    it "confirms answer as invalid when the user makes a wrong guess" do
      post "/api/v1/coordinates/checkAnswer",
      params: { "id" => Coordinate.first.id,
                "imageBounds" => { "width" => 1415, "height" => 931 },
                "clickCoords" => { "x" => 756, "y" => 580 }
      }.to_json,
      headers: { "CONTENT_TYPE" => "application/json" }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["is_valid_answer"]).to be(false)
    end
  end
end
