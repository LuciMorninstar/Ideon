import React from 'react'
import { useState } from 'react'

const Navbar = () => {

    const [posts, setPosts] = useState(true);
    const [videos, setVideos] = useState(false);

    const navbarItems = [
        {
            name:"Posts",
            link:"/posts"
        },
        {
            name:"Videos",
            link:"/videos"
        }
    ]

    const handleClick = (e)=>{
        e.preventDefault();

        if(item.name === "posts"){
            setPosts(true);

        }

    }


  return (
        <section className = "w-full flex flex-row justify-evenly border-b border-border-color py-3">
            {
                navbarItems.map((item,i)=>(
                    <div onClick={handleClick} key={name} className = "text-font-quaternary-color font-semibold">
                   <span className = { `${posts ? "text-font-primary-color absolute before:content-[''] before:absolute before:left-0 before:w-full before:h-[3px] before:bg-blue-500 ":""}`}>{item.name}</span> 
                    </div>
                ))

            }

        </section>
  )
}

export default Navbar