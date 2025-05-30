import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircleMore } from "lucide-react";
import { igLogo, logo } from "./assets";
import { Skeleton } from "./components";
import StoriesSection from "./components/StoriesSection";
import StoryViewer from "./components/StoryViewer";

import "./App.css";

function LaunchPage({ fadeLaunch }: { fadeLaunch: boolean }) {
  return (
    <div
      className={`w-full h-full bg-white flex justify-center items-center ${
        fadeLaunch ? "opacity-0" : "opacity-100"
      } transition-opacity duration-1000`}
    >
      <img className="h-20 w-20" src={logo} alt="instragram" />
    </div>
  );
}

function App() {
  const [showHome, setShowHome] = useState(false);
  const [fadeLaunch, setFadeLaunch] = useState(false);
  const [fadeHome, setFadeHome] = useState(false);

  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [storyBounds, setStoryBounds] = useState<DOMRect | null>(null);

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

  return (
    <div className="flex justify-center items-center h-[100dvh] w-full md:bg-neutral-950">
      <div
        ref={containerRef}
        className="relative app-container md:bg-white h-[100dvh] md:h-[80dvh] w-[100dvw] md:w-[39.5dvh] md:rounded-4xl py-4 md:pt-12 overflow-y-scroll no-scrollbar"
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
          <StoriesSection
            onStoryClick={(story, bounds) => {
              setSelectedStory(story);
              setStoryBounds(bounds);
            }}
          />
          <Skeleton />

          {selectedStory && storyBounds && containerRef.current && (
            <StoryViewer
              story={selectedStory}
              bounds={storyBounds}
              containerRect={containerRef.current.getBoundingClientRect()}
              onClose={() => {
                selectedStory.hasWatched = true;
                setSelectedStory(null);
                setStoryBounds(null);
              }}
            />
          )}
        </div>

        {!showHome && <LaunchPage fadeLaunch={fadeLaunch} />}
      </div>
    </div>
  );
}

export default App;
