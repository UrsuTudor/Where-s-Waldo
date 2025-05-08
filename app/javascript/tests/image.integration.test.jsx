jest.mock("../components/GreenMark", () => () => <p>Green mark</p>)
jest.mock("../components/ScoreForm", () => () => <p>Score form</p>)
jest.mock('../helpers', () => ({ startTime: jest.fn(), useInterval: jest.fn() }))

import "@testing-library/jest-dom";
import Image from "../components/Image";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup()

function mockValidFetchResponse(character){
  document.querySelector = jest.fn().mockReturnValue({
    content: 'mocked-csrf-token'
  });

  global.fetch = jest.fn(() => 
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({is_valid_answer: true, game_won: false, character: {character: "Waldo"}})
    })
  )
}

function mockInvalidFetchResponse(character){
  document.querySelector = jest.fn().mockReturnValue({
    content: 'mocked-csrf-token'
  });

  global.fetch = jest.fn(() => 
    Promise.resolve({
      ok: true,
       json: () => Promise.resolve({is_valid_answer: false, game_won: false, character: {character: "Waldo"}})
    })
  )
}

async function simulateSelection(character){
  await user.click(screen.getByTestId("image"))
  await user.click(screen.getByText(character))
}

beforeEach(() => {
  render(<Image />)
})

test("has its foundCharacters state updated by TargettingBox", async () => {
  let greenMark = screen.queryByText("Green mark")
  expect(greenMark).toBe(null)

  mockValidFetchResponse("Waldo")
  await simulateSelection("Waldo")
 
  expect(screen.getByText("Green mark")).toBeInTheDocument()
})

test("avoids storing duplicates", async () => {
  mockValidFetchResponse("Waldo")
  await simulateSelection("Waldo")

  let greenMark = screen.queryAllByText("Green mark")
  expect(greenMark.length).toBe(1)
 
  await simulateSelection("Waldo")

  greenMark = screen.queryAllByText("Green mark")
  expect(greenMark.length).not.toBe(2)
})

test("renders multiple tick marks if multiple characters have been found", async () => {
  mockValidFetchResponse("Waldo")
  await simulateSelection("Waldo")

  let greenMark = screen.queryAllByText("Green mark")
  expect(greenMark.length).toBe(1)

  mockValidFetchResponse("Wenda")
  await simulateSelection("Wenda")

  greenMark = screen.queryAllByText("Green mark")
  expect(greenMark.length).toBe(2)
})

test("renders error message if the user's answer is invalid", async () => {
  mockInvalidFetchResponse("Waldo")
  await simulateSelection("Waldo")

  expect(screen.getByTestId("wrongGuessMessage")).toBeInTheDocument()
})

test("hides a rendered error message if the user's next answer is valid", async () => {
  mockInvalidFetchResponse("Waldo")
  await simulateSelection("Waldo")
  
  expect(screen.getByTestId("wrongGuessMessage")).toBeInTheDocument()

  mockValidFetchResponse("Waldo")
  await simulateSelection("Waldo")
  expect(screen.queryByTestId("wrongGuessMessage")).toBe(null)
})

test("renders score submission form if 4 characters have been found", async () => {
  mockValidFetchResponse("Waldo")
  await simulateSelection("Waldo")

  mockValidFetchResponse("Wenda")
  await simulateSelection("Wenda")

  mockValidFetchResponse("Odlaw")
  await simulateSelection("Odlaw")

  expect(screen.queryByText("Score form")).toBe(null)

  mockValidFetchResponse("Wizard")
  await simulateSelection("Wizard Whitebeard")

  expect(screen.getByText("Score form")).toBeInTheDocument()
})
