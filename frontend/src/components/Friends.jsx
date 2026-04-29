import React from 'react'
import moon from "../assets/moon.jpg"
import { IoAdd } from "react-icons/io5";
import {Link} from "react-router"


const Friends = () => {

  const suggestedFriends = [
    {
      name:"Biraj Bhatta",
      profilePic:moon
    },
    {
      name:"Biraj Bhatta",
      profilePic:moon
    },
    {
      name:"Biraj Bhatta",
      profilePic:moon
    },
    {
      name:"Biraj Bhatta",
      profilePic:moon
    },
  ]

  
  return (
    <aside className = "px-2 py-1 lg:px-4 lg:py-2 border-l border-l-border-color min-h-screen flex flex-col gap-2">

      <h6 >Suggested For You</h6>
   
      <div className = "flex flex-col gap-2 py-1 px-1">

      {suggestedFriends.map((friend)=>(

        <Link to ="/" className = " group flex flex-row justify-between rounded-xl items-center cursor-pointer">
          {/* 1st part- Details */}
        <span className = " rounded-xl py-1 px-1  flex flex-row gap-3 items-center">
          {/* for image */}
          <div className = "w-12 h-12 rounded-full overflow-hidden">
            <img src={friend.profilePic} className = "w-full h-full object-cover object-center" alt = "profilePic"/>
          </div>

          {/* 2nd part */}

          <div className = "flex flex-col gap-0">
            <span className = "group-hover:text-font-secondary-color font-semibold text-sm text-font-tertiary-color transition-all ease-in-out duration-200 ">{friend.name}</span>
            <span className = "text-xs md:text-xs lg:text-sm text-font-tertiary-color group-hover:text-font-secondary-color transition-all ease-in-out">Friends with legion</span>

          </div>

        </span>
           
          {/* 2nd part - Icon */}
          <span className = " rounded-full w-7 h-7">
            <IoAdd className = "text-xl cursor-pointer hover:text-blue-500 transition-colors  duration-200 ease-in-out" />
          </span>

          </Link>

        

      ))}

      </div>
      
    </aside>

  )
}

export default Friends