import React from "react";
import japan from "../assets/japan.jpg";
import { useStoryStore } from "../stores/useStoryStore";
import { useParams } from "react-router";
import { useGetStoryById, useShowFriendStories } from "../hooks/useStory";
import { GiCrossMark } from "react-icons/gi";

const ShowStory = () => {
  const storyPopup = useStoryStore((state) => state.storyPopup); //boolean
  const closeStoryPopup = useStoryStore ((state)=>state.closeStoryPopup);

  const openStoryId = useStoryStore((state) => state.openStoryId); //for storing id of story


  const { isPending, isError, data: story } = useGetStoryById(openStoryId);

  console.log(openStoryId, "openStoryId");
  console.log(story, "storyDetails");
  console.log(closeStoryPopup, "closeStoryPopup");

  return (
    <section
      id="storyPopup"
      className={`${storyPopup ? "visible" : "hidden"}  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-2 w-full max-w-xl h-[80vh] oveflow-y-auto bg-secondary-background z-80 rounded-2xl`}
    >

      {/* absolute cancel */}
        <span
                  onClick={closeStoryPopup}
                  className=" bg-primary-background p-3 rounded-full absolute right-2 top-2 cursor-pointer"
                >
                  <GiCrossMark />
                </span>
      {/* absolute profilePic */}

      <div className="absolute top-9 w-20 h-20 rounded-full border-3 border-blue-500 p-1 overflow-hidden">
        <div className=" w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden bg-yellow-400">
          <img
            src={story?.owner?.profilePic?.url || japan}
            alt="image"
            className="w-full h-full object-cover "
          />
        </div>
      </div>

      {story?.image && (
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <img
            src={story?.image?.url || null}
            alt="story"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      {story?.video && (
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <video controls className="aspect-video rounded-2xl ">
            <source src={story?.video?.url || null} />
          </video>
        </div>
      )}

      {story?.title && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h3>{story?.title}</h3>
        </div>
      )}
    </section>
  );
};

export default ShowStory;
