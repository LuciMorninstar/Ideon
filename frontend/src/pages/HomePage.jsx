import React from 'react'
import StorySection from '../components/StorySection'
import { useState } from 'react';


import PostSection from '../components/PostSection';
import CreatePost from '../components/CreatePost';
import Navbar from "../components/Navbar";


const HomePage = () => {

  const [foryou, setForYou] = useState(false);
  const [videos, setVideos] = useState(false);  

  return ( 
    <>


   <Navbar/>
    <StorySection/>
    {/* <Options setForYou={setForYou} setVideos={setVideos} /> */}
    <CreatePost/>
    <PostSection/>s
     </>
  )
}

export default HomePage