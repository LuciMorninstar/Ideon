import React from 'react'
import StorySection from '../components/StorySection'
import { useState } from 'react';
import Options from '../components/Options';

import PostSection from '../components/PostSection';


const HomePage = () => {

  const [foryou, setForYou] = useState(false);
  const [videos, setVideos] = useState(false);  

  return ( 
    <>
   
    <StorySection/>
    {/* <Options setForYou={setForYou} setVideos={setVideos} /> */}
    <PostSection/>
     </>
  )
}

export default HomePage