import React from 'react'

const StorySlide = ({item,loading}) => {
  return (

    <>
    {loading ? <h1> Loading...</h1> :

    <div  className = "flex flex-col gap-2 items-center justify-center">
        {/* for image */}
        <div className = "w-26 h-26 rounded-full">
            <img src={item.image} alt="image" className ="w-full -h-full object-cover"/>
        </div>

        <span>{item.name}</span>

    </div>


    }
    </>
  


  )
}

export default StorySlide