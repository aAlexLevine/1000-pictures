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

describe("Home", () => {
  it("renders Home component", async () => {
    setup();
    expect(axios.get).toHaveBeenCalledTimes(10);
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

  it("adds additional scaled properties to data", async () => {
    //check for scaled_url, scaled width etc
  });

  it("does not crop images after resize", async () => {
    //check calculation equals width height
  })

  it("displays fetched images", async () => {
    //check alt tags
    // pagesData.forEach((page)=> {
    //   expect('alt tag' === page.download_url)
    // })
  });


});


//describe image
//link should be present
// expect(screen.getByRole("link")).toHaveAttribute(
//   "href",
//   "https://www.test.com"
// );

