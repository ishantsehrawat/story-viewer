// StoryViewer.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import TopProgressBar from "./TopProgressBar";
import type { IUserStory } from "../interface/IUserStory";
import { X } from "lucide-react";

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

  if (!story || !bounds || !containerRect) return null;

  const startX = bounds.left - containerRect.left;
  const startY = bounds.top - containerRect.top;

  const handleNext = () => {
    if (!story?.stories && story?.stories?.length < 1) return;
    if (activeIndex < story.stories.length - 1) {
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
        backgroundImage: `url(${story.stories[activeIndex].src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TopProgressBar
        total={story?.stories?.length || 0}
        activeIndex={activeIndex}
        onNext={handleNext}
      />
      <div className="p-2 flex justify-between items-center">
        <div className="h-8 flex gap-2 items-center text-xs">
          <img src={story.profilePic} className="h-full w-8 rounded-full" />
          <div>
            <p>{story.username}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 cursor-pointer">
          <X />
        </button>
      </div>
      <div
        className="absolute top-16 left-0 w-1/2 h-full z-40"
        onClick={handlePrev}
      />
      <div
        className="absolute top-16 right-0 w-1/2 h-full z-40"
        onClick={handleNext}
      />
    </motion.div>
  );
}

export default StoryViewer;
