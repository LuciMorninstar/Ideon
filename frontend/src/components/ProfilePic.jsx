import React from "react";
import profilePic from "../assets/profilePic.png"

const ProfilePic = () => {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden ">
      <img
        src={profilePic}
        alt="profilePic"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default ProfilePic;
