import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ScoreForm from "../components/ScoreForm";
import userEvent from "@testing-library/user-event";
import { act } from "react";

beforeEach(() => {
  render(<ScoreForm changeOnHomePage={jest.fn()}/>)
})

test("displays error message on submit if the name does not have the required length", () => {
  const form = screen.getByLabelText("form for submitting your score")
  act(() => {
    form.submit()
  })

  const errorMsg = screen.getByLabelText("message displayed due to a submission error")
  expect(errorMsg).toBeInTheDocument()
})

test("displays error message if the name is too short", async () => {
  const user = userEvent.setup()
  const nameInput = screen.getByLabelText("Name for leaderboard")
  await user.type(nameInput, "js")

  const errorMsg = screen.getByTestId("shortNameError")
  expect(errorMsg).toBeInTheDocument()
})

test("displays error message if the name is too short", async () => {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText("Name for leaderboard"), "123456789101112123512")

  const errorMsg = screen.getByTestId("longNameError")
  expect(errorMsg).toBeInTheDocument()
})

test("displays confirmation alert when submission succeeds", async () => {
  document.querySelector = jest.fn().mockReturnValue({
    content: 'mocked-csrf-token'
  });

  global.fetch = jest.fn(() => 
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({message: "Your score has been saved successfully!"})
    })
  )

  const user = userEvent.setup()
  await user.type(screen.getByLabelText("Name for leaderboard"), "Dave")

  window.alert = jest.fn()
  const form = screen.getByLabelText("form for submitting your score")

  // even though linter says using await here has no effect, not awaiting this submit causes the assertion to run before
  // the submission completes, causing it to fail
  await act(() => {
    form.submit()
  })
  
  expect(global.fetch).toHaveBeenCalled()
  expect(window.alert).toHaveBeenCalledWith("Your score has been saved successfully!")
})
