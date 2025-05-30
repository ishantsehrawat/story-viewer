import { useEffect } from "react";
import { storiesData } from "../assets";
import type { IUserStory } from "../interface/IUserStory";
import { preloadImages } from "../utils/preloadImage";

function getRingClass(
  index: number,
  isClose: boolean | undefined,
  hasWatched: boolean | undefined
) {
  if (index === 0) return "bg-transparent";
  if (hasWatched) return "bg-gray-300";
  if (isClose) return "bg-green-500";
  return "bg-gradient-to-tr from-pink-500 to-yellow-400";
}

function StoriesSection({
  onStoryClick,
}: {
  onStoryClick: (
    story: IUserStory,
    bounds: DOMRect,
    index: number,
    allStories: IUserStory[]
  ) => void;
}) {
  useEffect(() => {
    const allStoryImages = storiesData
      .flatMap((user) => user.stories)
      .map((story) => story.src);

    preloadImages(allStoryImages);
  }, []);

  return (
    <div className="flex px-2 py-4 gap-1 flex-nowrap overflow-x-scroll no-scrollbar">
      {Array.isArray(storiesData) &&
        storiesData?.map((story, index) => {
          const { isClose, hasWatched, profilePic, username } = story;
          const ringClass = getRingClass(index, isClose, hasWatched);

          return (
            <div
              key={index}
              data-story-id={story.username}
              data-testid="story-item"
              className="min-w-fit flex flex-col items-center gap-1 text-xs cursor-pointer"
              onClick={(e) => {
                if (story?.stories && story?.stories?.length > 0) {
                  const rect = (
                    e.currentTarget as HTMLElement
                  ).getBoundingClientRect();
                  onStoryClick(story, rect, index, storiesData);
                }
              }}
            >
              <div className={`${ringClass} p-[1px] rounded-full inline-block`}>
                <div className="bg-white p-[3px] rounded-full m-[0.125rem]">
                  <img
                    src={profilePic}
                    alt={username}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              </div>
              <p>{username}</p>
            </div>
          );
        })}
    </div>
  );
}

export default StoriesSection;
