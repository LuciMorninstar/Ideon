import React from 'react'

const ProfileNavBar = ({setActiveNavItem, activeNavItem}) => {

    const handlePostsClick = (e)=>{
        e.preventDefault();
        setActiveNavItem("posts");
    }

    const handleFriendsClick = (e)=>{
        e.preventDefault();
        setActiveNavItem("friends");
    }

    const handleReelsClick = (e)=>{
        e.preventDefault();
        setActiveNavItem("reels");
    }

 
    const navItems = [
        {
            name:"posts",
            onClick:handlePostsClick
        },
        {
            name:"friends",
            onClick:handleFriendsClick
        },
        {
            name:"reels",
            onClick:handleReelsClick
        },
    ]
  return (
    <nav className = "flex flex-row justify-evenly border-b border-border-color pb-2">
        {navItems.map((item,i)=>(
            <div onClick={item.onClick} key={i} className = {`group px-8 rounded-full py-2 cursor-pointer ${activeNavItem === item.name && "bg-blue-500 transition-all duration-300 ease-in-out"} `}>
                <span className = "font-semibold ">{item.name}</span>
            </div>
        ))}
           

    </nav>
  )
}

export default ProfileNavBar