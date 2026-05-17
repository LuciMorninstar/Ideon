import React from 'react'
import ProfileImages from '../components/ProfileImages'
import ProfileBio from '../components/ProfileBio'
import ProfileNavBar from '../components/ProfileNavbar'
import {useState} from "react"
import ProfilePosts from '../components/ProfilePosts'
import MyFriends from '../components/MyFriends'
import { useAuthStore } from '../stores/useAuthStore'
import { useParams } from 'react-router'
import { useGetUserDetails } from '../hooks/useUser'



const ProfileDetailsPage = () => {

      const [activeNavItem, setActiveNavItem] = useState("posts");

    const {id} = useParams();
    console.log(id);
  
    const {isPending, data:user, isError} = useGetUserDetails(id);
    console.log(user, 'userhere')
  
      // const user = useAuthStore((state)=>state.user);
  
      if(isPending){
        return <span>loading</span>
      }
      if(isError){
        return <span>errror</span>
      }

    // navbar items


    // console.log(activeNavItem, "active");


  return (

    <>
    <ProfileImages user={user}/>
    <ProfileBio user={user}/>
    <ProfileNavBar  setActiveNavItem={setActiveNavItem} activeNavItem={activeNavItem} />

    {activeNavItem === "posts" && <ProfilePosts user={user} id={id}/>}
    {activeNavItem === "friends" && <MyFriends user={user} id={id}/>}
    {activeNavItem === "reels" && <h1>reels</h1>}

    
    
    </>
    
   
  )
}

export default ProfileDetailsPage