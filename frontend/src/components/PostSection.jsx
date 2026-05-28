import React from 'react'
import profilePic from "../assets/profilePic.png"
import japan from "../assets/japan.jpg"
import moon from "../assets/moon.jpg"
import city from "../assets/city.jpg"

import Post from './Post'

import PostSkeleton from './skeletons/PostSkeleton'
import { useGetAllPosts } from '../hooks/usePost.js'



const PostSection = () => {

    const {isPending,isError, data:posts, error} = useGetAllPosts();
    console.log(posts);
    // console.log(data);


    


    if(isPending) return <PostSkeleton/>

    if(isError) return (<div> Something Error happened</div>)

  return (

    
    <section className='flex flex-col w-full gap-0'>

        {
            (posts || []).map((post,i)=>(
                <>
            <Post post = {post}/>
          
                </>
             
            ))
        }

    </section>
   
  )
}

export default PostSection