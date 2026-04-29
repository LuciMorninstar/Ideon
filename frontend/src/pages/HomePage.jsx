import React from 'react'
import StorySection from '../components/StorySection'
import { useState } from 'react';


import PostSection from '../components/PostSection';
import CreatePost from '../components/CreatePost';
import Navbar from "../components/Navbar";


const HomePage = () => {

 

  return ( 
    <>


   {/* <Navbar/> */}
    <StorySection/>
    {/* <Options setForYou={setForYou} setVideos={setVideos} /> */}
    <CreatePost/>
    <PostSection/>s
     </>
  )
}

export default HomePage