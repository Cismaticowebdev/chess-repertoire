import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GamesDatabase from "../components/GamesDatabase";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ moves: [] }),
    array,
  })
);

describe("GamesDatabase", () => {
  it("should display loading message while fetching data", () => {
    render(
      <GamesDatabase boardPosition="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" />
    );
    expect(screen.getByText("Loading database...")).toBeInTheDocument();
  });
});

describe("GamesDatabase", () => {
  it("should display fetched data when available", async () => {
    const mockData = {
      moves: [
        {
          san: "e4",
          white: 10,
          draws: 5,
          black: 15,
        },
        {
          san: "d4",
          white: 7,
          draws: 3,
          black: 10,
        },
      ],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    render(
      <GamesDatabase boardPosition="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" />
    );

    expect(await screen.findByText("e4")).toBeInTheDocument();
    expect(await screen.findByText("Total games: 30")).toBeInTheDocument();
    expect(await screen.findByText("White win: 33.33%")).toBeInTheDocument();
  });
});
