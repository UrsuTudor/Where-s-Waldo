import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TargetingBox from "../components/TargetingBox";

test("disables a button if a character has already been found", async () => {
  render(<TargetingBox clickCoords={{x: 1, y: 2}} imageBounds={{heigth: 20, width: 40}} foundCharacters={[{character: "Waldo"}]} />);

  const button = screen.getByLabelText("waldo button")
  expect(button).toBeDisabled()
})
