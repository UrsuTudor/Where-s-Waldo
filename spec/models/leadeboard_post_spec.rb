require 'rails_helper'

describe LeaderboardPost do
  describe "validations" do
    it "is not valid if user name is missing" do
      post = LeaderboardPost.new(user: nil, completion_time: 1)
      expect(post).to_not be_valid
    end

    it "is not valid if user name is too short" do
      post = LeaderboardPost.new(user: "Al", completion_time: 1)
      expect(post).to_not be_valid
    end

    it "is not valid if user name is too long" do
      post = LeaderboardPost.new(user: "1234567891011121314", completion_time: 1)
      expect(post).to_not be_valid
    end

    it "is not valid if completion time is missing" do
      post = LeaderboardPost.new(user: "Dave", completion_time: nil)
      expect(post).to_not be_valid
    end

    it "is valid if paramaters are given" do
      post = LeaderboardPost.new(user: "Dave", completion_time: 13)
      expect(post).to be_valid
    end
  end
end
