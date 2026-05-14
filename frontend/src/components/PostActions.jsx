import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";

import { GoBookmark } from "react-icons/go";
import { useToggleBookmarks } from "../hooks/usePost";
import toast from "react-hot-toast";
import { useState } from "react";

const PostActions = ({post}) => {

const {mutate:toggleBookmarksMutation, isPending, isSuccess, isError}= useToggleBookmarks();

// const [isBookmarked, setIsBookmarked] = useState(false);
const [bookmarkCount, setBookmarkCount] = useState(0);


// console.log(isBookmarked);


const postId = post._id;


const handleBookmarksClick = (e)=>{
  e.preventDefault();
  toggleBookmarksMutation(postId,{

    onSuccess:(data)=>{
      toast.success(data?.message || "Toggled Bookmarks");
      // setIsBookmarked(data?.isBookmarked);
      setBookmarkCount(data?.bookmarkCount);
      
    },

    onError:(err)=>{
      console.log(err.message);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  })
 



}

  const postActions = [
    {
      name: "Like",
      icon: <IoHeartOutline />,
      count: post?.reactionsCount || 0,
      color:"pink"
    },
    {
      name: "Comment",
      icon: <FaRegComment />,
      count: post?.commentsCount || 0,
      color:"green"
    },
    {
      name: "Share",
      icon: <PiShareFatLight />,
      count: post?.sharesCount || 0,
      color:"blue"
    },
    {
      name: "Bookmark",
      icon: <GoBookmark />,
      color:"teal",
      onClick:handleBookmarksClick
    },
  ];
  return (
    <section className="flex flex-row justify-evenly py-2">
      {postActions.map((item, i) => (
        <div onClick={item.onClick} key={item.name} className=" group flex flex-row gap-1 items-center cursor-pointer ">
          <span className={`relative text-font-quaternary-color text-base sm:text-lg before:absolute before:content-[''] before:w-8 before:h-8 before:rounded-full before:opacity-0 before:transition-all before:duration-150 before:z-10 before:top-1/2 before:-translate-y-1/2 before:-left-1/2 before:translate-x-0.5  group-hover:before:opacity-30

          ${item.color === "pink" && "group-hover:before:bg-pink-500 group-hover:text-pink-500 "}
          ${item.color === "blue" && "group-hover:before:bg-blue-500 group-hover:text-blue-500"}
          ${item.color === "green" && "group-hover:before:bg-green-500 group-hover:text-green-500"}
          ${item.color === "teal" && "group-hover:before:bg-teal-500 group-hover:text-teal-500"}
            
            `}>
            <span className ={item.name === "Bookmark"? post.isBookmarked? "text-blue-500":"":""}>{item.icon}</span>
          </span>
          <span className={` text-font-qusaternary-color text-xs sm:text-sm
            ${item.color === "pink" && "group-hover:text-pink-500"}
            ${item.color === "blue" && "group-hover:text-blue-500"}
            ${item.color === "green " && "group-hover:text-green-500"}
            ${item.color === "teal" && "group-hover:text-teal-500"}
            `}>
            
            {item.count}
          </span>
        </div>
      ))}
    </section>
  );
};

export default PostActions;
