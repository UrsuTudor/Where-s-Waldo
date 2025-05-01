require 'rails_helper'

describe Coordinate do
  describe "validations" do
    it "is not valid if character name is missing" do
      coordinate = Coordinate.new(character: nil, x: 1, y: 1)
      expect(coordinate).to_not be_valid
    end

    it "is not valid if x is missing" do
      coordinate = Coordinate.new(character: "john", x: nil, y: 1)
      expect(coordinate).to_not be_valid
    end

    it "is not valid if y is missing" do
      coordinate = Coordinate.new(character: "john", x: 1, y: nil)
      expect(coordinate).to_not be_valid
    end

    it "is valid if all paramaters are given" do
      coordinate = Coordinate.new(character: "john", x: 1, y: 1)
      expect(coordinate).to be_valid
    end
  end

  describe "#check_selection_proximity" do
    let(:coordinate) { Coordinate.new("x" => 0.404, "y" => 0.621) }
    let(:image_bounds) { { "width" => 1415, "height" => 931 } }

    it "returns true when click is within the 2% margin" do
      click_coords = { "x" => 572, "y" => 580 }
      expect(coordinate.check_selection_proximity(image_bounds, click_coords)).to be true
    end

    it "returns false when click is above the character" do
      click_coords = { "x" => 572, "y" => 536 }
      expect(coordinate.check_selection_proximity(image_bounds, click_coords)).to be false
    end

    it "returns false when click is below the character" do
      click_coords = { "x" => 572, "y" => 653 }
      expect(coordinate.check_selection_proximity(image_bounds, click_coords)).to be false
    end

    it "returns false when click is to the right of the character" do
      click_coords = { "x" => 641, "y" => 580 }
      expect(coordinate.check_selection_proximity(image_bounds, click_coords)).to be false
    end

    it "returns false when click is to the left of the character" do
      click_coords = { "x" => 504, "y" => 580 }
      expect(coordinate.check_selection_proximity(image_bounds, click_coords)).to be false
    end
  end
end
