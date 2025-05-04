// mocking both since I am only concerned with whether or not they get rendered, not the behavior of the components 
// themsevels
jest.mock('../components/Leaderboard', () => () => <div aria-label="leaderboard table">Mocked Leaderboard</div>);
jest.mock('../components/Image', () => () => <div aria-label="game area">Mocked Image</div>);

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Home from "../components/Home";

beforeEach(() => {
  render(<Home />)
})

test("renders Leaderboard by default", async () => {
  const leaderboardTable = screen.getByLabelText("leaderboard table");
  expect(leaderboardTable).toBeInTheDocument();
});

test("renders the Image component when the play button is clicked", async () => {
  const user = userEvent.setup()

  let gameArea = screen.queryByLabelText("game area")
  expect(gameArea).toBeNull()

  await user.click(screen.getByLabelText("play button"))
  gameArea = screen.getByLabelText("game area")
  expect(gameArea).toBeInTheDocument()
})
