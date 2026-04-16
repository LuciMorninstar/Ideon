import React from 'react'
import profilePic from "../assets/profilePic.png"
import japan from "../assets/japan.jpg"
import moon from "../assets/moon.jpg"
import city from "../assets/city.jpg"

import Post from './Post'

import PostSkeleton from './skeletons/PostSkeleton'


const PostSection = () => {

    const posts = [
        {
            name:"Stars Winner",
            date:"42min",
            profilePic:profilePic,
            details:"Amazing ! 😲 PM Balen Shah has been included in Time Magazine’s “100 Most Influential People of 2026,” alongside global leaders and policymakers, marking a major international recognition. PM Balen is the one who won the hearts of Nepalese People. In spite of being a rapper and a ex engineer he rivaled the ex prime minister Kp sharmal oli to get to this position that he is in now ",

            image:city
        
        },
        {
            name:"Kibutsuzi Muzan",
            date:"1hr",
            profilePic:japan,
            details:"Amazing ! 😲 PM Balen Shah has been included in Time Magazine’s “100 Most Influential People of 2026,” alongside global leaders and policymakers, marking a major international recognition. PM Balen is the one who won the hearts of Nepalese People. In spite of being a rapper and a ex engineer he rivaled the ex prime minister Kp sharmal oli to get to this position that he is in now ",

            image:japan
        
        },
        {
            name:"Bloodhounds",
            date:"2min",
            profilePic:moon,
            details:"Amazing ! 😲 PM Balen Shah has been included in Time Magazine’s “100 Most Influential People of 2026,” alongside global leaders and policymakers, marking a major international recognition. PM Balen is the one who won the hearts of Nepalese People. In spite of being a rapper and a ex engineer he rivaled the ex prime minister Kp sharmal oli to get to this position that he is in now ",

            image:moon
        
        },
        {
            name:"Rey Mysterio",
            date:"5min",
            profilePic:city,
            details:"Amazing ! 😲 PM Balen Shah has been included in Time Magazine’s “100 Most Influential People of 2026,” alongside global leaders and policymakers, marking a major international recognition. PM Balen is the one who won the hearts of Nepalese People. In spite of being a rapper and a ex engineer he rivaled the ex prime minister Kp sharmal oli to get to this position that he is in now ",

            image:city
        
        },
    ]


      const loading = false;


    if(loading) return <PostSkeleton/>

  return (

    
    <section className='flex flex-col w-full gap-0'>

        {
            posts.map((post,i)=>(
                <>
            <Post post = {post}/>
          
                </>
             
            ))
        }

    </section>
   
  )
}

export default PostSection