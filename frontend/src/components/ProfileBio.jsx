import React from "react";
import dayjs from "dayjs";
import { MdOutlineEdit } from "react-icons/md";
import {useAuthStore} from "../stores/useAuthStore";

const ProfileBio = ({user}) => {

    // const user = useAuthStore((state)=>state.user);
//   const user = {
//     name: "Bibek Pandit",
//     email: "bibek@gmail.com",
//     bio:"I am a web developer. I am trying to crete a social media type of wesbite. Allowing users to create pages and connect with each others via various chats and posts. Creative images and all",
//     joined: "2010",
//     friends: 2,
//   };
  return (
    <section className="w-full pt-20 lg:pt-24   max-lg:px-3 flex flex-row justify-between border-b border-border-color pb-4">
      {/* for name and username */}
      <div className=" flex flex-col pl-8 lg:pl-16 w-full gap-1 ">
        <h3>{user?.name}</h3>
        <span className="text-sm  lg:text-base text-font-quaternary-color ">{user?.email}</span>

        <span className="text-sm line-clamp-4 lg:text-base ">{user?.bio || ""}</span>

       
        <h5 className = "px-4 py-2 bg-secondary-background w-max rounded-2xl">
          {user?.friends?.length || 0} <span className="text-blue-500">friends</span>
        </h5>
      </div>

      {/* for edit button */}
      <div>
        <button className="button_style flex flex-row gap-2 items-center justify-center ">
          <span>
            <MdOutlineEdit />
          </span>
          Profile
        </button>
      </div>
    </section>
  );
};

export default ProfileBio;
