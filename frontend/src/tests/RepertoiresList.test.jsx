import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RepertoiresList from "../components/RepertoiresList";
import { MemoryRouter as Router } from "react-router-dom";

vi.mock("../components/FirebaseCode", () => ({
  auth: {
    currentUser: { email: "user@example.com" },
  },
}));

vi.mock("firebase/auth", () => ({
  getIdToken: vi.fn().mockResolvedValue("mock-token"),
}));

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("RepertoiresList", () => {
  it("should render initial state correctly", () => {
    render(
      <Router>
        <RepertoiresList />
      </Router>
    );

    expect(screen.getByText("Repertoires")).toBeInTheDocument();
    expect(screen.getByText("Add new repertoire")).toBeInTheDocument();
    expect(screen.getByText("Show only my repertoires")).toBeInTheDocument();
  });
});

describe("RepertoiresList", () => {
  it("should fetch and display data correctly", async () => {
    const mockData = [
      {
        id: "1",
        title: "Repertoire 1",
        moves: "1.e4 e5",
        creator: "user@example.com",
      },
      {
        id: "2",
        title: "Repertoire 2",
        moves: "2.d4 d5",
        creator: "another@example.com",
      },
    ];

    // Set up the fetch mock
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    render(
      <Router>
        <RepertoiresList />
      </Router>
    );

    // Verify the fetch call was made
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Wait for the list to be populated and check the content
    await waitFor(() => {
      expect(screen.getByText("Repertoire 1")).toBeInTheDocument();
      expect(screen.getByText("Repertoire 2")).toBeInTheDocument();
    });
  });
});
