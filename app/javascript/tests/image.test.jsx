jest.mock('../helpers', () => ({ startTime: jest.fn(), useInterval: jest.fn() }))
import { startTime, useInterval } from "../helpers";

jest.mock("../components/TargetingBox", () => () => <p>Target box</p>)
jest.mock("../components/GreenMark", () => () => <p>Green mark</p>)
jest.mock("../components/ScoreForm", () => () => <p>Score form</p>)

import "@testing-library/jest-dom";
import Image from "../components/Image";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<Image />)
})

test("calls startTime on reder", () => {
  expect(startTime).toHaveBeenCalled()
})

test("calls useInterval on reder", () => {
  expect(useInterval).toHaveBeenCalled()
})

test("displays TargettingBox on click", async () => {
  const user = userEvent.setup()

  let mockBox = screen.queryByText("Target box")
  expect(mockBox).toBe(null)

  await user.click(screen.getByTestId("image"))
  mockBox = screen.getByText("Target box")
  expect(mockBox).toBeInTheDocument()
})

test("hides TargettingBox on a second click", async () => {
  const user = userEvent.setup()

  let mockBox = screen.queryByText("Target box")
  expect(mockBox).toBe(null)

  await user.click(screen.getByTestId("image"))
  await user.click(screen.getByTestId("image"))

  mockBox = screen.queryByText("Target box")
  expect(mockBox).toBe(null)
})
