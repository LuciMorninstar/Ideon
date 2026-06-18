import React from 'react'
import moon from "../assets/moon.jpg"
import dayjs from "dayjs";
import { useGetAllMySavedPosts } from '../hooks/useSavedPosts'
import { IoHeartOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { X } from 'lucide-react';
import { useDeleteSingleSavedPost } from '../hooks/useSavedPosts';
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query";


const BookmarkPage = () => {

  const queryClient = useQueryClient();

const {isPending, isError, data:savedPosts, error} = useGetAllMySavedPosts();

console.log("savedPosts", savedPosts );

const {mutate:deleteSingleSavedPostMutation, isPending:deleteSingleSavedPostPending} = useDeleteSingleSavedPost();


const handleDeleteSingleSavedPost = (e,postId)=>{
  e.preventDefault();

  deleteSingleSavedPostMutation(postId, {
    onSuccess:()=>{
      toast.success("Successfully Deleted the saved post");
      queryClient.invalidateQueries({queryKey:['savedPosts']});
    },

    onError:(err)=>{
      console.log(err);
      toast.error(err?.response?.data?.messsage || "Something went wrong");
    }

  })

}



  return (

    <section className ="w-full pt-20 lg:pt-12 max-lg:px-3 flex flex-col gap-2 overflow-y-auto">

      {
        (savedPosts || []).map((post,i)=>(
          <div key={post._id} className = "relative flex flex-row justify-between gap-4 px-2 py-2 bg-secondary-background items-center rounded-2xl ">

          


            {/* absolute cancel */}
            <div onClick={(e)=>handleDeleteSingleSavedPost(e,post._id)} className ="absolute group top-4 right-4 text-2xl text-font-tertiary-color p-2 rounded-full bg-primary-background cursor-pointer">
                   <X className = {deleteSingleSavedPostPending ? "animate-spin " : "group-hover:text-red-500 transition-all duration-300 ease-in"} />
            </div>
            {/* left part */}

            
            <div className = "size-40 p-2 rounded-2xl overflow-hidden">
              <img className = "w-full h-full object-center object-cover" src={post?.post?.images?.[0]?.url} alt="post-image"/>

            </div>

            {/* middle part */}
            <div className = "flex flex-col gap-3 items-center"> 
              <h4 className = "line-clamp-2">{post?.post?.text}</h4>
           

            <div className = "flex flex-row gap-3 items-center">
                <img className = "size-10 max-md:size-8 rounded-full object-cover object-center" src={post?.post?.owner?.profilePic?.url} alt = "profilePic"/>
                 <span className = "text-font-secondary-color text-sm md:text-base">Posted By {post?.post?.owner?.name}</span>

              </div>
              
              <div className = "flex flex-row gap-3">
                <span className = "flex flex-row items-center gap-2">
                  <IoHeartOutline />
                  <p>{post?.post?.reactions.length || 0} </p>
                </span>
                <span className = "flex flex-row items-center gap-2">
                  <FaRegComment />
                  <p>{post?.post?.comments.length || 0} </p>
                </span> 

              </div>
              
             
            </div>

            {/* right side */}
            <div className = "flex flex-col gap-3 items-center">
              
               
               <p className = "text-xs">Uploaded {dayjs(post?.post?.createdAt).fromNow()}</p>

             

            </div>


               

           


          </div>
        ))
        

      }


      


    </section>


    
  )
}

export default BookmarkPage