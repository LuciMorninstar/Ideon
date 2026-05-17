import React from 'react'
import moon from "../assets/moon.jpg"
import profilePic from "../assets/profilePic.png"
import coverImg from "../assets/coverImg.jpg"


const ProfileImages = ({user}) => {


  
  return (
    <section className = "w-full">
        {/* cover Image */}
        <div className = "relative w-full aspect-16/9 lg:aspect-21/9   ">
        <img src={user?.coverImage?.url || coverImg } alt = "coverImage" className = "w-full h-full object-cover object-center overflow-hidden lg:rounded-4xl"/>

         {/* absolute  profilePic    */}
      
            <span className = "absolute -bottom-18 lg:-bottom-24 left-8 size-40 lg:size-50 rounded-full overflow-hidden border-6 border-primary-background">
                <img src={user?.profilePic?.url} alt="profilePic" className = "w-full h-full object-cover object-center"/>
            </span>

        </div>
        {/* images end */}

    </section>
    
  )
}

export default ProfileImages