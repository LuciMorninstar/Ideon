import React from 'react'
import StorySkeleton from './skeletons/StorySkeleton'
import user from "../assets/user.avif"
import { useStoryStore } from '../stores/useStoryStore'

const StorySlide = ({story, storiesPending}) => {



  const setStoryPopup = useStoryStore ((state)=>state.setStoryPopup);
  const setOpenStoryId = useStoryStore((state)=>state.setOpenStoryId);


  const handleStoryClick = (e,storyId)=>{
    e.preventDefault();
    console.log(storyId, "storyId");
    setStoryPopup(true);
    setOpenStoryId(storyId);
    
  

  }
  return (
    
    <>
    {storiesPending ? <StorySkeleton/> :

    <div onClick ={(e)=>handleStoryClick(e,story._id)}  key = {story?._id}  className = "flex flex-col gap-0 items-center justify-center cursor-pointer  ">
        {/* for image */}
        <div className = "w-full h-full rounded-full border-3 border-blue-500 p-1">
        <div className = " w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden bg-yellow-400">
            <img src={story?.owner?.profilePic?.url || user } alt="image" className ="w-full h-full object-cover "/>
        </div>
          </div>

        <span className ="text-xs lg:text-sm line-clamp-1">{story?.owner?.name}</span>

    </div>


    }
    </>
  


  )
}

export default StorySlide