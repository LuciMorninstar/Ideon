import React from 'react'
import StorySection from '../components/StorySection'
import { useState } from 'react';


import PostSection from '../components/PostSection';
import CreatePost from '../components/CreatePost';
import Navbar from "../components/Navbar";
import { useEffect } from 'react';


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

 

  return ( 
    <>

<section className = {openCreatePostPopup ? "  select-none":""}>


   {/* <Navbar/> */}
    <StorySection/>
    {/* <Options setForYou={setForYou} setVideos={setVideos} /> */}
    <CreatePost openCreatePostPopup={openCreatePostPopup} setOpenCreatePostPopup={setOpenCreatePostPopup}/>
    <PostSection/>
    </section>

     </>
  )
}

export default HomePage