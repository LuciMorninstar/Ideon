import React from 'react'
import profilePic from "../assets/profilePic.png"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination,Autoplay,Navigation  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import StorySlide from './StorySlide';


const StorySection = () => {

  const loading = false;
  const stories = [
    {
      name:"Story 1",
      image:profilePic
    },
    {
      name:"Story 1",
      image:profilePic
    },
    {
      name:"Story 1",
      image:profilePic
    },
    {
      name:"Story 1",
      image:profilePic
    },
    {
      name:"Story 1",
      image:profilePic
    },
  ]
  return (
     <Swiper
       pagination={{
          dynamicBullets: true,
          clickable:true
        }}
        modules={[Pagination,Autoplay,Navigation]}
        speed={1800}
          effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{delay:4000, disableOnInteraction:false, waitForTransition: false,}}
        // navigation={true} 
      
        className="mySwiper heroSwiper"
        loop={true}
        spaceBetween={20} 
        slidesPerView={1}
        autoHeight={false}
        
      
      >
         {(stories || []).map((item,i)=>(
           <SwiperSlide className = "heroSwiperSlide" key = {i}><StorySlide item={item} loading={loading} /></SwiperSlide>

        ))}


      </Swiper>

  )
}

export default StorySection