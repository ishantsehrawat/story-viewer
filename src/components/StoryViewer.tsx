// StoryViewer.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import TopProgressBar from "./TopProgressBar";
import type { IUserStory } from "../interface/IUserStory";
import { Star, X } from "lucide-react";

function StoryViewer({
  story,
  bounds,
  containerRect,
  onClose,
  onNextUser,
  onPreviousUser,
}: {
  story: IUserStory;
  bounds: DOMRect;
  containerRect: DOMRect;
  onClose: () => void;
  onNextUser?: () => void;
  onPreviousUser?: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (
    !story ||
    !story?.stories ||
    !story?.stories?.length ||
    !bounds ||
    !containerRect
  )
    return null;

  const startX = bounds.left - containerRect.left;
  const startY = bounds.top - containerRect.top;

  const handleNext = () => {
    if (!story?.stories || story.stories.length < 1) return;
    if (story.stories && activeIndex < story.stories.length - 1) {
      setActiveIndex((i) => i + 1);
    } else {
      setActiveIndex(0);
      onNextUser?.();
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((i) => i - 1);
    } else {
      setActiveIndex(0);
      onPreviousUser?.();
    }
  };

  return (
    <motion.div
      initial={{
        position: "absolute",
        top: startY,
        left: startX,
        width: bounds.width,
        height: bounds.height,
        borderRadius: "9999px",
        overflow: "hidden",
      }}
      animate={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "0rem",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="absolute z-50 bg-black bg-opacity-90 flex flex-col  text-white"
      style={{
        backgroundImage: `url(${story?.stories?.[activeIndex]?.src ?? ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TopProgressBar
        total={story?.stories?.length || 0}
        activeIndex={activeIndex}
        onNext={handleNext}
      />
      <div
        className="p-2 flex justify-between items-center"
        data-testid={`story-view-${activeIndex}`}
      >
        <div className="h-8 flex gap-2 items-center text-xs">
          <img
            src={story.profilePic}
            className="h-full w-8 rounded-full object-cover"
          />
          <div className="flex gap-2">
            <p>{story.username}</p>
            <span className="text-gray-400">
              {story?.stories[activeIndex]?.time}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {story.isClose && (
            <div className="bg-green-500 rounded-full py-0.5 px-2">
              <Star fill="#fff" strokeWidth={0} className="h-4 w-4" />
            </div>
          )}
          <button
            onClick={onClose}
            data-testid="close-story"
            className="p-1 cursor-pointer"
          >
            <X />
          </button>
        </div>
      </div>
      <div
        className="absolute top-16 left-0 w-1/2 h-full z-40"
        data-testid="prev-story"
        onClick={handlePrev}
      />
      <div
        className="absolute top-16 right-0 w-1/2 h-full z-40"
        data-testid="next-story"
        onClick={handleNext}
      />
    </motion.div>
  );
}

export default StoryViewer;
