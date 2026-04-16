import React from 'react'
import StorySkeleton from './skeletons/StorySkeleton'

const StorySlide = ({item,loading}) => {
  return (
    

    <>
    {loading ? <StorySkeleton/> :

    <div  className = "flex flex-col gap-0 items-center justify-center  ">
        {/* for image */}
        <div className = "w-full h-full rounded-full border-3 border-blue-500 p-1">
        <div className = " w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden bg-yellow-400">
            <img src={item.image} alt="image" className ="w-full h-full object-cover "/>
        </div>
          </div>

        <span className ="text-xs lg:text-sm line-clamp-1">{item.name}</span>

    </div>


    }
    </>
  


  )
}

export default StorySlide