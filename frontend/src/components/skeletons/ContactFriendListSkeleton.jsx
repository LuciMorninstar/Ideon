import React from 'react'

const ContactFriendListSkeleton = () => {
  return (
    <section className = "flex flex-col rounded-2xl overflow-y-scroll ">
        {[1,2,3,4,5].map((item)=>(

              <div
          key={item}
          className="flex flex-row items-center gap-2 rounded-2xl  animate-pulse"
        >
          
          {/* image skeleton */}
          <div className="w-12 h-12 rounded-full bg-primary-background animate-pulse shrink-0">

          </div>

      
            <div className="h-4 w-full bg-primary-background animate-pulse rounded-2xl"></div>
          
          </div>


        ))}
    </section>
   
  )
}

export default ContactFriendListSkeleton