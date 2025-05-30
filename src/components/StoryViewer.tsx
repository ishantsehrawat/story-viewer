import { motion } from "framer-motion";

function StoryViewer({
  story,
  bounds,
  containerRect,
  onClose,
}: {
  story: any;
  bounds: DOMRect;
  containerRect: DOMRect;
  onClose: () => void;
}) {
  if (!story || !bounds || !containerRect) return null;

  const startX = bounds.left - containerRect.left;
  const startY = bounds.top - containerRect.top;

  console.log(story);

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
      className="absolute z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white"
    >
      <div className="w-full h-5 p-2 pt-5 flex gap-1">
        {story.stories.map(() => {
          <div className="h-1 flex-1 rounded-full bg-neutral-400"></div>;
        })}
      </div>
      <img src={story.stories[0].src} alt="story" className="w-full h-full" />
    </motion.div>
  );
}

export default StoryViewer;
