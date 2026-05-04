import React, { useState } from 'react'

import CreatePostPopup from './CreatePostPopup';
import ProfilePic from './ProfilePic';


const CreatePost = ({setOpenCreatePostPopup, openCreatePostPopup}) => {



  return (

    <>
    <section className = "flex flex-col gap-0 px-2 py-1 lg:px-4 lg:py-2 border-b border-border-color">
        <div className = "flex flex-row gap-4 items-center">
          {/* for profilePic */}
          <span>

          <ProfilePic/>
          </span>
         
          {/* for input */}
          <div className = "w-full rounded-full overflow-hidden ">
            <input onClick={()=>setOpenCreatePostPopup(true)}  className = "w-full bg-secondary-background py-2 px-4 rounded-full text-base" type="text" name="text" placeholder="What's on your mind"/>
          </div>
          
        </div>
    </section>
    
    {
      openCreatePostPopup &&
    <CreatePostPopup setOpenCreatePostPopup={setOpenCreatePostPopup}/>
    }


    </>
  )
}

export default CreatePost