import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import App from "./App";
import { storiesData } from "./assets";
import "@testing-library/jest-dom";

beforeAll(() => {
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    top: 10,
    left: 10,
    width: 100,
    height: 100,
    right: 110,
    bottom: 110,
    x: 10,
    y: 10,
    toJSON: () => {},
  }));
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("Story Viewer App", () => {
  test("launch screen fades and home screen appears", async () => {
    render(<App />);

    expect(screen.getByAltText(/instagram/i)).toBeInTheDocument();

    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByAltText(/Ishugram/i)).toBeInTheDocument();
    });
  });

  test("renders StoriesSection and allows story selection", async () => {
    render(<App />);
    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByAltText(/Ishugram/i)).toBeInTheDocument();
    });

    const storyThumbnails = await screen.findAllByTestId("story-item");
    expect(storyThumbnails.length).toBeGreaterThan(0);

    fireEvent.click(storyThumbnails[1]);

    await waitFor(() => {
      expect(screen.getByTestId("close-story")).toBeInTheDocument();
    });
  });

  test("navigates to next and previous stories", async () => {
    render(<App />);
    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByAltText(/Ishugram/i)).toBeInTheDocument();
    });

    const storyThumbnails = await screen.getAllByTestId("story-item");
    fireEvent.click(storyThumbnails[1]);

    const nextBtn = await screen.findByTestId("next-story");
    fireEvent.click(nextBtn);

    expect(screen.queryByTestId("story-view-1")).toBeInTheDocument();

    const prevBtn = await screen.findByTestId("prev-story");
    fireEvent.click(prevBtn);

    expect(screen.queryByTestId("story-view-0")).toBeInTheDocument();
  });

  test("closes story viewer when close button clicked", async () => {
    render(<App />);
    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByAltText(/Ishugram/i)).toBeInTheDocument();
    });

    const storyThumbnails = await screen.getAllByTestId("story-item");
    fireEvent.click(storyThumbnails[1]);

    const nextBtn = await screen.findByTestId("close-story");
    fireEvent.click(nextBtn);

    expect(screen.queryByTestId("close-story")).not.toBeInTheDocument();
  });

  test("closes story viewer when end is reached", async () => {
    render(<App />);
    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByAltText(/Ishugram/i)).toBeInTheDocument();
    });

    const storyThumbnails = await screen.getAllByTestId("story-item");
    fireEvent.click(storyThumbnails[storiesData.length - 1]); // Last one

    const totalStories = storiesData[storiesData.length - 1].stories.length;

    const nextBtn = await screen.findByTestId("next-story");

    for (let i = 0; i < totalStories; i++) {
      fireEvent.click(nextBtn);
    }

    await waitFor(() => {
      expect(screen.queryByTestId("close-story")).not.toBeInTheDocument();
    });
  });
});
