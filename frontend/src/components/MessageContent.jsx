import React from "react";
import profilePic from "../assets/profilePic.png";
import { FiMessageCircle } from "react-icons/fi";
import { useMessageStore } from "../hooks/useMesssageStore";
import { useGetConversationMessages, useSendMessage } from "../hooks/useMessage";
import { useAuthStore } from "../stores/useAuthStore";
import { useRef, useEffect } from "react";
import { PiImagesThin } from "react-icons/pi";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { IoSendSharp } from "react-icons/io5";
import city from "../assets/city.jpg";
import japan from "../assets/japan.jpg";
import { useState } from "react";
import { Loader } from 'lucide-react';

import toast from "react-hot-toast";

const MessageContent = () => {


    const user = useAuthStore((state) => state.user);

  const selectedUser = useMessageStore((state) => state.selectedUser);
  console.log("selectedUser", selectedUser );

const {mutate:sendMessageMutation, isPending:sendingMessage} = useSendMessage();

  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);


  const handleImageChange = (e)=>{
    e.preventDefault();
    const images = Array.from(e.target.files);
    setImages(images);
    
  }

  const handleVideoChange = (e)=>{
    e.preventDefault();
    setVideo(e.target.files[0]);
  }

  const handleMessageSubmit = (e)=>{
    e.preventDefault();

    const formData = new FormData();

    formData.append("text", text);

  if (images) {
    images.forEach((img) => {
      formData.append("images", img);
    });
  }

  if (video) {
    formData.append("video", video);
  }

    for(let item of formData.entries()){
      console.log("message ko",item[0], item[1]);
      }

      // calling mutation here

      sendMessageMutation({formData,selectedUserId:selectedUser},{
        onSuccess:()=>{
          toast.success("Message sent successfully");
          setText("");
          setImages([]);
          setVideo(null);
          
        },
        onError:(err)=>{
          console.log(err);
          toast.error(err.response?.data?.message || "An error occured");
        }
      })
  }





  const {
    isPending,
    isError,
    data: messages,
    error,
  } = useGetConversationMessages(selectedUser);

  console.log(messages, "messages came");

  const scrollToEndMessageRef = useRef(null);

  useEffect(() => {
    scrollToEndMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // refs
  const imageInputRef = useRef(null);
  const reelInputRef = useRef(null);

  // here selectedUser is storing an Id.

  if (!selectedUser || selectedUser === null) {
    return (
      <section className="w-full flex flex-col gap-2 justify-center items-center ">
        <div
          id="messageIcon"
          className="bg-primary-background rounded-full size-16 flex flex-row items-center justify-center cursor-pointer"
        >
          <FiMessageCircle className="text-3xl text-blue-500 " />
        </div>

        <h5>Select a Conversation</h5>
        <p className="text-font-tertiary-color text-center text-sm">
          Choose a converation from the sidebar to start chatting or contunute a
          previous converation.
        </p>
      </section>
    );
  }
  return (
    <section className=" flex flex-col h-full overflow-hidden">
      {/* headertab */}
      <div className="flex flex-row gap-3 items-center border-b border-border-color py-2 px-1 shrink-0 ">
        {/* profilePic */}
        <div className="size-12 overflow-hidden rounded-full ">
          <img
            src={profilePic}
            className="w-full h-full object-cover object-center "
            alt="profilePic"
          />
        </div>

        <span>
          <h6>Stars winner</h6>
          <p className="text-sm">online</p>
        </span>
      </div>
      {/* header tab ends */}

      {/* actual messages content */}

      <div className="flex flex-col gap-1 w-full flex-1 overflow-y-auto ">
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

{
  msg?.text &&
  (
     <div className="chat-bubble relative flex flex-col gap-1 w-max bg-primary-background p-3 rounded-xl">
              <p className="text-xs">{msg.text || "undefined"}</p>
              <p className="absolute bottom-0 right-1 text-[10px] text-font-quaternary-color">
                {new Date(msg.isEditedAt || msg.createdAt).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </p>
            </div>

  )
}

{
  msg?.images?.length >0 &&
  (
    <div className = "chat-bubble bg-primary-background rounded-2xl ">
    <div className={`grid  gap-1 ${msg.images.length === 1 ? "grid-cols-1": msg.images.length === 2 ? "grid-cols-2":"grid-cols-3"} w-full  max-h-64 rounded-2xl`}>
            {msg.images.map((img,i)=>(
              <div key={i} className = "max-w-30">
              <img  src={img.url} className = "w-full h-full object-cover object-center"/>
              </div>
            ))}
              <p className="absolute bottom-0 right-1 text-[10px] text-font-quaternary-color">
                {new Date(msg.isEditedAt || msg.createdAt).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </p>
            </div>
            </div>

  )
}

{
  msg?.video &&
  (
    <div className = "chat-bubble bg-primary-background">
      <video controls className = "aspect-16/9 rounded-2xl">
        <source src={msg.video.url}/>
      </video>
   
            
              <p className="absolute bottom-0 right-1 text-[10px] text-font-quaternary-color">
                {new Date(msg.isEditedAt || msg.createdAt).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </p>
           
            </div>

  )
}
           
          </div>
        ))}

        <span ref={scrollToEndMessageRef}></span>
      </div>

      <form
      onSubmit={handleMessageSubmit}
        enctype="multipart/form-data"
        className=" relative w-full flex  flex-row-reverse items-center justify-between gap-4 bg-primary-background p-2 rounded-2xl  "
      >
        {/* absolute images or video preview */}

  

       <div className={` ${images?.length > 0 || video?.length>0 ? "block" : "hidden"} absolute bottom-full left-0 w-full max-h-64 overflow-y-auto bg-primary-background rounded-xl  p-1 flex flex-col gap-4`}>
        
          

          {images?.length === 1 && (
            <div className="bg-primary-background grid grid-cols-1 h-20 rounded-2xl overflow-hidden">
              <img
                src={URL.createObjectURL(images[0])}
                alt="image"
                className="object-cover object-center w-full h-full"
              />
            </div>
          )}
          {images?.length >= 2 && (
            <div className="grid grid-cols-3 gap-1 w-full  max-h-64 rounded-2xl">
              {images?.map((img, i) => (
                <div key={i} className="overflow-hidden p-1 bg-secondary-background max-h-20 rounded-xl">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="image"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}


          <div>
          {
            video && 
            (
              <video controls className="grid grid-cols-1 rounded-2xl">
                <source src={URL.createObjectURL(video)}/>
              </video>
            )
          }
          </div>

      

       
        </div>

        {/* send button */}
        <button type="submit" className="text-xl cursor-pointer group">
          {
            sendingMessage? <Loader className = "animate-spin"/>: <IoSendSharp className="group-hover:text-blue-400" />
          }
         
        </button>
        {/* message input */}
        <input
          type="text"
          onChange={(e)=>setText(e.target.value)}
          placeholder="Type your Message!"
          className=" w-full bg-secondary-background p-2 rounded-xl  text-font-tertiary-color outline-none focus:caret-blue-500  "
        />

        {/* buttons for images and video input */}

        <div className=" flex flex-row items-center gap-3 ">
          <input
            ref={imageInputRef}
            onChange={handleImageChange}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
          />
          <span
            className="text-xl cursor-pointer group"
            onClick={() => imageInputRef.current?.click()}
          >
            {" "}
            <PiImagesThin className="group-hover:text-blue-400" />
          </span>

          <input
            ref={reelInputRef}
            onChange = {handleVideoChange}
            type="file"
            className="hidden"
            accept="video/*"
          />

          <span
            className="text-xl cursor-pointer group"
            onClick={() => reelInputRef.current?.click()}
          >
            {" "}
            <SiGoogledisplayandvideo360 className="group-hover:text-blue-400" />
          </span>
        </div>
      </form>
    </section>
  );
};

export default MessageContent;
