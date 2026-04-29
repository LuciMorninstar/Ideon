import React from "react";
import ProfilePic from "./ProfilePic";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { SiGoogledisplayandvideo360 } from "react-icons/si";

const CreatePostPopup = ({ setOpenCreatePostPopup }) => {

    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    console.log(text, "text");

    const handleImageChange = (e)=>{
        setImages(Array.from(e.target.files));
    }

    const handleVideoChange = (e)=>{
        setVideo(e.target.files[0]);
    }

 const formData = new FormData();
 formData.append("text", text);
 formData.append("images", images);
 formData.append("video", video);

//  for(let item of formData.entries()){
//  console.log(item[0], item[1]);
//  }
 console.log(...formData);



  const imageRef = useRef(null);
  const videoRef = useRef(null);

  const handleImageClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const handleVideoClick = (e) => {
    e.preventDefault();
    videoRef.current.click();
  };

  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-2">
      <div className="px-8 py-8 rounded-2xl bg-secondary-background">
        {/* first part */}
        <div className="flex flex-row gap-2 items-start">
          <span>
            <ProfilePic />
          </span>
          <span className="w-full">
            <textarea
              cols={40}
              className="no-scrollbar min-h-32 w-full text-font-secondary-color resize-none outline-none placeholder:text-font-secondary-color text-base bg-secondary-background rounded-2xl px-2 py-3 caret-blue-500"
              name="text"
              placeholder="What's happening"
              onChange={(e)=>setText(e.target.value)}
              value={text}
            />
          </span>
        </div>

        {/* 2nd part */}

        <div className="flex flex-row justify-between items-center px-1">
          {/* left part */}
          <div className="flex flex-row gap-4">
            {/* for image */}
            <div>
              <input
                name="image"
                ref={imageRef}
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <span
                className="cursor-pointer text-2xl"
                onClick={handleImageClick}
              >
                <BsFillImageFill />
              </span>
            </div>

            {/* for video */}

            <div>
              <input
                name="video"
                ref={videoRef}
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleVideoChange}
              />
              <span
                className="cursor-pointer text-2xl"
                onClick={handleVideoClick}
              >
                <SiGoogledisplayandvideo360 />
              </span>
            </div>
          </div>

          {/* right part */}

          <button className="px-4 py-2 font-semibold rounded-xl bg-blue-500">
            Post
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreatePostPopup;
