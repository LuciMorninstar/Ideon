import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";

import { GoBookmark } from "react-icons/go";

const PostActions = () => {
  const postActions = [
    {
      name: "Like",
      icon: <IoHeartOutline />,
      count: 10,
      color:"pink"
    },
    {
      name: "Comment",
      icon: <FaRegComment />,
      count: 20,
      color:"green"
    },
    {
      name: "Share",
      icon: <PiShareFatLight />,
      count: 5,
      color:"blue"
    },
    {
      name: "Bookmark",
      icon: <GoBookmark />,
      count: 3,
      color:"teal"
    },
  ];
  return (
    <section className="flex flex-row justify-evenly py-2">
      {postActions.map((item, i) => (
        <div key={item.name} className=" group flex flex-row gap-1 items-center cursor-pointer ">
          <span className={`relative text-font-quaternary-color text-base sm:text-lg before:absolute before:content-[''] before:w-8 before:h-8 before:rounded-full before:opacity-0 before:transition-all before:duration-150 before:z-10 before:top-1/2 before:-translate-y-1/2 before:-left-1/2 before:translate-x-0.5  group-hover:before:opacity-30

          ${item.color === "pink" && "group-hover:before:bg-pink-500 group-hover:text-pink-500 "}
          ${item.color === "blue" && "group-hover:before:bg-blue-500 group-hover:text-blue-500"}
          ${item.color === "green" && "group-hover:before:bg-green-500 group-hover:text-green-500"}
          ${item.color === "teal" && "group-hover:before:bg-teal-500 group-hover:text-teal-500"}
            
            `}>
            {item.icon}
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
