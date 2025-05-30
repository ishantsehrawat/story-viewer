import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircleMore } from "lucide-react";
import { igLogo, logo, storiesData } from "./assets";
import { Skeleton } from "./components";
import StoriesSection from "./components/StoriesSection";
import StoryViewer from "./components/StoryViewer";

import "./App.css";
import type { IUserStory } from "./interface/IUserStory";

function LaunchPage({ fadeLaunch }: { fadeLaunch: boolean }) {
  return (
    <div
      className={`w-full h-full bg-white flex justify-center items-center ${
        fadeLaunch ? "opacity-0" : "opacity-100"
      } transition-opacity duration-1000`}
    >
      <img className="h-20 w-20" src={logo} alt="instagram" />
    </div>
  );
}

function App() {
  const [showHome, setShowHome] = useState(false);
  const [fadeLaunch, setFadeLaunch] = useState(false);
  const [fadeHome, setFadeHome] = useState(false);

  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [storyBounds, setStoryBounds] = useState<DOMRect | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(
    null
  );
  const [allStories, setAllStories] = useState<any[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeLaunch(true);
      setTimeout(() => {
        setShowHome(true);
        setTimeout(() => setFadeHome(true), 100);
      }, 200);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleStoryClick = (
    story: IUserStory,
    bounds: DOMRect,
    index: number,
    all: IUserStory[]
  ) => {
    setAllStories(all);
    setSelectedStory(story);
    setStoryBounds(bounds);
    setCurrentStoryIndex(index);
  };

  const handleNextUser = () => {
    if (
      currentStoryIndex === null ||
      currentStoryIndex >= allStories.length - 1
    ) {
      onCloseStoryViewer();
      return;
    }
    const nextIndex = currentStoryIndex + 1;
    const nextStory = allStories[nextIndex];
    const newRect = document
      .querySelectorAll("[data-story-id]")
      [nextIndex]?.getBoundingClientRect();
    if (nextStory && newRect) {
      setSelectedStory(nextStory);
      setStoryBounds(newRect as DOMRect);
      storiesData[currentStoryIndex].hasWatched = true;
      setCurrentStoryIndex(nextIndex);
    }
  };

  const handlePreviousUser = () => {
    if (currentStoryIndex === null || currentStoryIndex <= 0) return;
    const prevIndex = currentStoryIndex - 1;
    const prevStory = allStories[prevIndex];
    const newRect = document
      .querySelectorAll("[data-story-id]")
      [prevIndex]?.getBoundingClientRect();
    if (prevStory && newRect) {
      storiesData[currentStoryIndex].hasWatched = true;
      setSelectedStory(prevStory);
      setStoryBounds(newRect as DOMRect);
      setCurrentStoryIndex(prevIndex);
    }
  };

  const onCloseStoryViewer = () => {
    selectedStory.hasWatched = true;
    setSelectedStory(null);
    setStoryBounds(null);
  };

  return (
    <div className="flex justify-center items-center h-[100dvh] w-full md:bg-neutral-950">
      <div
        ref={containerRef}
        className={`relative app-container md:bg-white h-[100dvh] md:h-[80dvh] w-[100dvw] md:w-[39.5dvh] md:rounded-4xl py-4 md:pt-12 ${
          selectedStory && storyBounds && containerRef.current
            ? "overflow-y-hidden"
            : "overflow-y-scroll"
        } no-scrollbar`}
      >
        <div
          className={`w-full h-full ${showHome ? "" : "hidden"} ${
            fadeHome ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <div className="w-full px-2 flex justify-between items-center">
            <img src={igLogo} alt="Ishugram" className="h-12" />
            <div className="flex gap-6">
              <Heart />
              <MessageCircleMore />
            </div>
          </div>
          <StoriesSection onStoryClick={handleStoryClick} />
          <Skeleton />

          {selectedStory && storyBounds && containerRef.current && (
            <StoryViewer
              story={selectedStory}
              bounds={storyBounds}
              containerRect={containerRef.current.getBoundingClientRect()}
              onClose={onCloseStoryViewer}
              onNextUser={handleNextUser}
              onPreviousUser={handlePreviousUser}
            />
          )}
        </div>
        {!showHome && <LaunchPage fadeLaunch={fadeLaunch} />}
      </div>
    </div>
  );
}

export default App;
