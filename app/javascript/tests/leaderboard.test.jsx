import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Leaderboard from "../components/Leaderboard";

test("correctly renders table data fetched from the server", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([{ id: 1, user: "Eve", completion_time: 75 }, { id: 2, user: "Alex", completion_time: 85 }]),
    })
  );

  render(<Leaderboard />);

  await waitFor(() => {
    expect(screen.getByText("Eve")).toBeInTheDocument();
    expect(screen.getByText("01:15")).toBeInTheDocument();
    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getByText("01:25")).toBeInTheDocument();
  });
})
