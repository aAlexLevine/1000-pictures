import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "../pages/index";
import axios from "axios";

const setup = () => render(<Home />);

afterEach(() => {
  jest.clearAllMocks();
});

window.scrollBy = jest.fn();

describe("Home", () => {
  it("renders Home component", async () => {
    setup();
    await waitForElementToBeRemoved(() =>
      screen.getByText("Loading 1000 Pictures...")
    );
  });

  it("displays loading screen at first", async () => {
    setup();
    expect(screen.getByText("Loading 1000 Pictures...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      screen.getByText("Loading 1000 Pictures...")
    );
  });

  it("does not display loading screen after fetch", async () => {
    setup();
    await waitForElementToBeRemoved(() =>
      screen.getByText("Loading 1000 Pictures...")
    );
    expect(screen.queryByText("Loading 1000 Pictures...")).toBeNull();
  });

  it("fetches one page 10 times", async () => {
    setup();
    await waitForElementToBeRemoved(() =>
      screen.getByText("Loading 1000 Pictures...")
    );
    expect(axios.get).toHaveBeenCalledTimes(10);
  });

  it("renders dynamic image wrapper", async () => {
    setup();
    await waitForElementToBeRemoved(() =>
      screen.getByText("Loading 1000 Pictures...")
    );
    expect(screen.getAllByTestId("image-wrapper"))
  });
});
