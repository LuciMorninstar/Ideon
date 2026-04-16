import React from 'react'
import profilePic from "../assets/profilePic.png"
import moon from "../assets/moon.jpg"
import japan from "../assets/japan.jpg"
import city from "../assets/city.jpg"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination,Autoplay,Navigation  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import StorySlide from './StorySlide';
import {useRef} from "react"

import { FaChevronLeft, } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";




const StorySection = () => {


  const scrollRef = useRef(null);

  const scrollLeft = ()=>{

    if(!scrollRef.current) return;
    scrollRef.current?.scrollBy({
      left:-850,
      behavior:"smooth"
    })
  }

  const scrollRight = ()=>{
      if(!scrollRef.current) return;
    scrollRef.current?.scrollBy({
      left:850,
      behavior:"smooth"
    })
  }

  const loading = false;
  const stories = [
    {
      name:"Story Bibek",
      image:moon
    },
    {
      name:"Story 1",
      image:profilePic
    },
    {
      name:"Story 1",
      image:japan
    },
    {
      name:"Story 1",
      image:city
    },
    {
      name:"Story 1",
      image:profilePic
    },
    {
      name:"Story 1",
      image:moon
    },
    {
      name:"Story 1",
      image:city
    },
    {
      name:"Story 1",
      image:japan
    },
    {
      name:"Story 1",
      image:profilePic
    },
    {
      name:"Story 1",
      image:city
    },
  ]
  return (

    <section className = "relative w-full  py-5 border-b border-border-color">

      <div ref={scrollRef} className = " cardWrapper no-scrollbar">

          <button onClick={scrollLeft} className = "absolute left-0 top-1/2 -translate-y-1/2 bg-secondary-background opacity-60 text-black z-50 w-8 h-8 rounded-full cursor-pointer flex flex-row items-center justify-center">
          <FaChevronLeft className = "text-font-primary-color" />

          </button>

        <button onClick={scrollRight} className='absolute right-0 z-50 top-1/2 -translate-y-1/2 bg-secondary-background opacity-60 text-black w-8 h-8 rounded-full cursor-pointer flex flex-row items-center justify-center'> 
        <FaChevronRight className = "text-font-primary-color" />
      </button>
        


        {
          stories.map((item, i)=>(

            <StorySlide loading = {loading} item={item}/>
          
          ))
        }



      </div>


    </section>
    

  )
}

export default StorySection