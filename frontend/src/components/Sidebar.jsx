import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { BsChat } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../assets/logo.png"
import profilePic from "../assets/profilePic.png"
import { Link } from 'react-router';










const Sidebar = () => {

  const sidebarItems = [
    {
      name:"Home",
      link:"/",
      icon:<GoHomeFill />,
      showNumber:false
    },
    {
      name:"Friends",
      link:"/friends",
      icon:<FaUserFriends />,
      showNumber:false
    },
    {
      name:"Bookmarks",
      link:"/bookmarks",
      icon:<PiBookmarkSimpleFill />,
      showNumber:false
    },
    
    {
      name:"Reels",
      link:"/reels",
      icon:<SiGoogledisplayandvideo360 />,
      showNumber:false
    },
    {
      name:"Chat",
      link:"/chat",
      icon:<BsChat />,
      showNumber:false
    },
    {
      name:"Profile",
      link:"/profile",
      icon:<BiSolidUser />,
      showNumber:false
    },
    {
      name:"Settings",
      link:"/settings",
      icon:<IoSettingsOutline />,
      showNumber:false
    },


    
  ]




  return (
    <aside className = " min-h-screen border-r border-r-gray-700 ">

        <div className = "flex flex-col justify-between  h-screen py-2 px-2  max-md:items-center   "> 

          <div className = "w-16 h-16  ">
            <img src={logo} alt="logo" className = "w-full h-full bg-cover object-center object-cover"/>
          </div>

        <div className = " flex flex-col gap-2">
      
        {
          sidebarItems.map((item,i)=>(

            <Link to ={item.link} className='flex  flex-row gap-4 px-3 py-3 rounded-full items-center justify-start hover:bg-sidebar-hover active:bg-sidbar-hover w-max transition-all ease-in-out duration-100 cursor-pointer '>
              <span className=' text-3xl text-font-primary-color'>{item.icon}</span>
              <span className = "text-xl text-font-primary-color max-md:hidden transition-all ease-in-out duration-300">{item.name}</span>
            </Link>
          
          ))
        }
          </div>

          
        
            <div className = "flex flex-row  justify-center items-center gap-3 px-2 py-3 rounded-full ">
              {/* for image */}
              <div className ="w-12 h-12 rounded-full shrink-0">
                <img src={profilePic} alt="profilePic" className ="h-full w-full object-cover object-center rounded-full"/>
              </div>

              {/* for name and username */}
              <div className ="max-md:hidden flex flex-col w-full gap-0 ">
                <span className = "font-semibold">Bibek Pandit</span>
                <span className = "text-xs md:text-xs lg:text-sm ">stars.winner1121@gmail.com</span>
              </div>  
            
            </div>
      
           
          </div>


    
      
    </aside>
  )
}

export default Sidebar