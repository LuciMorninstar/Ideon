  import React, { useEffect } from "react";
  import ProfilePic from "./ProfilePic";
  import { useRef, useState } from "react";
  import { BsFillImageFill } from "react-icons/bs";
  import { SiGoogledisplayandvideo360 } from "react-icons/si";
  import { GiCrossMark } from "react-icons/gi";
  import { useCreatePost } from "../hooks/usePost";
  import toast from "react-hot-toast";

  const CreatePostPopup = ({ setOpenCreatePostPopup }) => {

    const {mutate:createPostMutation, isPending, isSuccess, isError} = useCreatePost();


      useEffect(()=>{
          if(isSuccess){
      toast.success("Post created successfully");
      
    }

    },[isSuccess]);

    // useEffect(()=>{

    //   if(isError){
    //     toast.error("Failed to create post");
    //   }
    // },[isError])

    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);


    const handleImageChange = (e) => {
      const images = Array.from(e.target.files);
      setImages(images);

    
    };

    const handleVideoChange = (e) => {
      setVideo(e.target.files[0]);
    };

    const handlePostSubmit = (e) => {

      e.preventDefault();
      
      const formData = new FormData();
      
      formData.append("text", text);
      
      images.forEach((img) => {
        formData.append("images", img);
      });
      if (video) {
        formData.append("video", video);
      }
      console.log("appended");
      
      for(let item of formData.entries()){
      console.log(item[0], item[1]);
      }

      createPostMutation(formData, {
          onSuccess:()=>{
            toast.success("Post created successfully");
            setText("");
            setImages([]);
            setVideo(null);
            setOpenCreatePostPopup(false);
          },
          onError:(err)=>{
            console.log(err);
            toast.error(err.response?.data?.message || "An error occured");
          }

        }

      );
      
   
    };

    

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
      <section
        id="popup"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-2 w-full max-w-lg max-h-[80vh] oveflow-y-auto "
      >
        <form  onSubmit={handlePostSubmit}  encType="multipart/form-data"  className="px-8 py-8 rounded-2xl bg-secondary-background flex flex-col gap-10">
          {/* absolute cancel */}
          <span
            onClick={() => setOpenCreatePostPopup(false)}
            className=" bg-primary-background p-3 rounded-full absolute right-2 top-2 cursor-pointer"
          >
            <GiCrossMark />
          </span>
          {/* first part */}
          <div className="flex flex-row gap-2 items-start">
            <span>
              <ProfilePic />
            </span>
            <span className="w-full">
              <textarea
                cols={40}
                className="no-scrollbar min-h-32 w-full text-font-secondary-color resize-none outline-none placeholder:text-font-secondary-color text-base rounded-2xl px-2 py-3 caret-blue-500"
                name="text"
                placeholder="What's happening"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </span>
          </div>

        {/* 2nd part */}
          <div className = "flex flex-col gap-4">

          {images?.length === 1 && (
            <div className="bg-green-500 max-w-sm h-64 rounded-2xl overflow-hidden">
              <img
                src={URL.createObjectURL(images[0])}
                alt="image"
                className="object-cover object-center w-full h-full"
              />
            </div>
          )}
          {images?.length >= 2 && (
            <div className="grid grid-cols-2 gap-1 w-full  max-h-64 rounded-2xl">
              {images?.map((img, i) => (
                <div key={i} className="overflow-hidden p-1 bg-secondary-background max-h-32 rounded-xl">
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
              <video controls className="w-full max-h-60 rounded-2xl">
                <source src={URL.createObjectURL(video)}/>
              </video>
            )
          }
          </div>

          </div>

          {/* 3rd part */}

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

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 font-semibold rounded-xl cursor-pointer bg-blue-500"
            >
              {isPending ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </section>
    );
  };

  export default CreatePostPopup;
