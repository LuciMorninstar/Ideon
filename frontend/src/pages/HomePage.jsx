import React from 'react'
import StorySection from '../components/StorySection'
import { useState } from 'react';


import PostSection from '../components/PostSection';
import CreatePost from '../components/CreatePost';
import Navbar from "../components/Navbar";
import { useEffect } from 'react';
import { FiMessageCircle } from "react-icons/fi";
import { useMessageStore } from '../hooks/useMesssageStore';
import MessageBox from '../components/MessageBox';



const HomePage = () => {


  const [openCreatePostPopup, setOpenCreatePostPopup] = useState(false);
  console.log(openCreatePostPopup, "openCreatePostPopup");

  
  useEffect(()=>{
    if(openCreatePostPopup){
      document.body.style.overflow="hidden";
    }
    else{
      document.body.style.overflow="auto";
    }

  },[openCreatePostPopup])


  const isMessageOpen = useMessageStore((state)=>state.isMessageOpen);
  console.log("isMessageOpen", isMessageOpen);

  const toggleMessageOpen = useMessageStore((state)=>state.toggleMessageOpen);

  

 

  return ( 
    <>

<section className = {openCreatePostPopup ? "  select-none":""}>



   {/* <Navbar/> */}
    <StorySection/>
    {/* <Options setForYou={setForYou} setVideos={setVideos} /> */}
    <CreatePost openCreatePostPopup={openCreatePostPopup} setOpenCreatePostPopup={setOpenCreatePostPopup}/>
    <PostSection/>

    {/* message */}

    {isMessageOpen ? <MessageBox/> :
<div onClick={toggleMessageOpen} id="messageIcon" className = "bg-secondary-background rounded-full size-16 absolute z-90 bottom-10 right-10 flex flex-row items-center justify-center cursor-pointer">
  <FiMessageCircle  className ="text-3xl text-blue-500 " />
</div>  
}
    </section>

     </>
  )
}

export default HomePage