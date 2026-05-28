import React from 'react'
import { useGetFriendsByUserId } from '../hooks/useUser'
import { useAuthStore } from '../stores/useAuthStore';
import ContactFriendListSkeleton from './skeletons/ContactFriendListSkeleton';


const ContactFriendList = () => {

  const user = useAuthStore((state)=>state.user);

  const {isPending,isError, data:friends} = useGetFriendsByUserId(user?._id);



  if(isPending){
    return (<ContactFriendListSkeleton/>)
  }
  if(isError){
    return (<div>Something went wrong</div>)
  }



  return (
    <div className = "flex flex-col rounded-2xl overflow-y-scroll no-scrollbar">
      {
        (friends || []).map((friend)=>(
          <div key={friend?._id} className = "flex flex-row gap-4 items-center ">
            <img src={friend?.profilePic?.url} alt="profilePic" className ="w-12 h-12 rounded-full object-cover object-center"/>

            <span className ="text-sm font-semibold text-font-secondary-color line-clamp-1">{friend?.name}</span>
            
          </div>
        ))
      } 


    </div>

  )
}

export default ContactFriendList