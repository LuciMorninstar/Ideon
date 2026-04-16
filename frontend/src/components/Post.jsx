import React from 'react'
import PostActions from './PostActions'
import PostSkeleton from './skeletons/PostSkeleton';

const Post = ({post}) => {

  

  return (

    

        // wrapper
                <div className ="flex flex-col gap-2 px-2 py-1 lg:px-4 lg:py-2 border-b border-border-color">
                    {/* 1st part */}
                    <div className="flex flex-row gap-2 ">
                        {/* image */}
                        <span className = " w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                            <img src={post.image} alt="profilePic" className ="w-full  h-full object-cover object-center"/>
                        </span>
                        {/* name and date */}
                        <div className="flex flex-col gap-0" >
                            <h5>{post.name}</h5>
                            <span className='text-xs text-font-quaternary-color font-semibold'>{post.date}</span>
                        
                        </div>
                   

                    </div>
                    {/* 1st part ends */}
                    {/* 2nd part */}
                    <div className=' ml-14 flex flex-col gap-2'>
                        <p className=' text-xs sm:text-sm line-clamp-3 text-font-tertiary-color'>{post.details}</p>

                        <div className = "max-w-full max-h-[450px]  rounded-4xl overflow-hidden">
                            <img src={post.image} alt="post-image"
                            className='object-cover object-center h-full w-full'/>
                        </div>
                        
                    </div>
                    {/* 2nd part ends */}

                    {/* postActions */}
                    <PostActions/>




                </div>
                // /wrapper ends
   
    
  )
}

export default Post