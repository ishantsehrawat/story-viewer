import { storiesData } from "../assets";

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
    story: any,
    bounds: DOMRect,
    index: number,
    allStories: any[]
  ) => void;
}) {
  return (
    <div className="flex px-2 py-4 gap-1 flex-nowrap overflow-x-scroll no-scrollbar">
      {storiesData.map((story, index) => {
        const { isClose, hasWatched, profilePic, username } = story;
        const ringClass = getRingClass(index, isClose, hasWatched);

        return (
          <div
            key={index}
            data-story-id={story.username}
            className="min-w-fit flex flex-col items-center gap-1 text-xs cursor-pointer"
            onClick={(e) => {
              if (story.stories && story.stories?.length > 0) {
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect();
                onStoryClick(story, rect, index, storiesData);
              }
            }}
          >
            <div className={`${ringClass} p-[1px] rounded-full inline-block`}>
              <div className="bg-white rounded-full m-[0.125rem]">
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
