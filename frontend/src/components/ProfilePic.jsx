import React from "react";
import profilePic from "../assets/profilePic.png"
import { useAuthStore } from "../stores/useAuthStore";

const ProfilePic = () => {

  const user = useAuthStore((state)=>state.user);
  
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden ">
      <img
        src={user?.profilePic?.url}
        alt="profilePic"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default ProfilePic;
