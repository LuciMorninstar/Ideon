import React from 'react'

const PostSkeleton = () => {

    const num = 3;

    
   
  return (
    <>
    {Array(num).fill(0).map((_,i)=>(
        <div className ="flex flex-col gap-2 px-2 py-1 lg:px-4 lg:py-2 border-b border-border-color animate-pulse">
                    {/* 1st part */}
                    <div className="flex flex-row gap-2 ">
                        {/* image */}
                        <span className = " w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-secondary-background ">
                        </span>
                        {/* name and date */}
                        <div className="flex flex-col gap-2 mt-2" >
                           <span className = "w-32 h-3 bg-secondary-background rounded"></span>
                           <span className = "w-24 h-3 bg-secondary-background rounded"></span>
                           
                        
                        </div>
                   

                    </div>
                    {/* 1st part ends */}
                    {/* 2nd part */}
                    <div className=' ml-14 flex flex-col gap-3'>
                        <p className='w-full h-3 bg-secondary-background rounded'></p>
                        <p className='w-full h-3 bg-secondary-background rounded'></p>
                        <p className='w-full h-3 bg-secondary-background rounded'></p>

                     
                            {/* image */}
                            <div className="mt-4 w-full max-h-[450px] h-80 bg-secondary-background rounded-4xl"></div>
                        
                    
                        
                    </div>
                    {/* 2nd part ends */}

                    {/* postActions */}
                    <div className = "flex flex-row justify-evenly py-2">
                        <span className= "w-8 h-8 rounded-full bg-secondary-background"></span>
                        <span className= "w-8 h-8 rounded-full bg-secondary-background"></span>
                        <span className= "w-8 h-8 rounded-full bg-secondary-background"></span>
                        <span className= "w-8 h-8 rounded-full bg-secondary-background"></span>

                    </div>




                </div>
    ))}
    </>
    
      
  )
}

export default PostSkeleton