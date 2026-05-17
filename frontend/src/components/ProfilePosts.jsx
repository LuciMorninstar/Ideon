import React from 'react'
import { useGetPostsByUserId } from '../hooks/usePost';
import PostSkeleton from './skeletons/PostSkeleton';
import Post from './Post';
import { useParams } from 'react-router'


const ProfilePosts = ({id}) => {

  // const {id} = useParams();
  console.log(id, "profilePosts")

    const {isPending, isError, data:posts, error} = useGetPostsByUserId(id);

    console.log(posts, "profilePostsData")
    

      if(isPending) return <PostSkeleton/>

    if(isError) return (<div> Something Error happened </div>)

      if(!posts || posts.length === 0) return (<div> No posts found </div>)

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

export default ProfilePosts