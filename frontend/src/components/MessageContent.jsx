import React from 'react'
import profilePic from "../assets/profilePic.png"
import { FiMessageCircle } from 'react-icons/fi'
import { useMessageStore } from '../hooks/useMesssageStore'
import { useGetConversationMessages } from '../hooks/useMessage'
import { useAuthStore } from '../stores/useAuthStore'
import {useRef, useEffect} from "react"

const MessageContent = () => {


  const user = useAuthStore((state)=>state.user);

  const selectedUser = useMessageStore((state)=>state.selectedUser);


      const {isPending, isError, data:messages, error} = useGetConversationMessages(selectedUser); 
      

      console.log(messages,"messages came");

      const scrollToEndMessageRef = useRef(null);

      useEffect(()=>{
        scrollToEndMessageRef.current?.scrollIntoView({behavior:"smooth"});
        
      },[messages])



      


  // here selectedUser is storing an Id.

  if(!selectedUser || selectedUser === null){
    return (
        <section className = "w-full flex flex-col gap-2 justify-center items-center " >
        <div id="messageIcon" className = "bg-primary-background rounded-full size-16 flex flex-row items-center justify-center cursor-pointer">
          <FiMessageCircle  className ="text-3xl text-blue-500 " />
        </div>  

        <h5>Select a Conversation</h5>
        <p className ="text-font-tertiary-color text-center text-sm">Choose a converation from the sidebar to start chatting or contunute a previous converation.</p>

    </section>
    )
  }
  return (

    <section className = "flex flex-col gap-2 p-2 overflow-y-scroll">

      {/* headertab */}
      <div className = "flex flex-row gap-3 items-center border-b border-border-color py-2 px-1 ">
        {/* profilePic */}
        <div className = "size-12 overflow-hidden rounded-full ">
          <img src={ profilePic} className = "w-full h-full object-cover object-center " alt="profilePic"/>
        </div>

        <span>
          <h6>Starsd winner</h6>
          <p className ="text-sm">online</p>
        </span>
      </div>
      {/* header tab ends */}

<div className="flex flex-col gap-1 w-full">
  {(messages || []).map((msg) => (
    <div
      key={msg._id}
      className={`chat ${user._id === msg.senderId?._id ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image size-8">
        <img
          src={msg.senderId?.profilePic?.url}
          alt="senderProfilePic"
          className="w-full h-full object-cover object-center rounded-full"
        />
      </div>

      <div className="chat-bubble relative flex flex-col gap-1 w-max bg-primary-background p-3 rounded-2xl">
        <p className="text-xs">{msg.text || "undefined"}</p>
        <p className="absolute bottom-0 right-1 text-[10px] text-font-quaternary-color">
          {new Date(msg.isEditedAt || msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  ))}

  <span ref={scrollToEndMessageRef}>
  </span>

</div>
    


      
    </section>
   

  
  )
}

export default MessageContent