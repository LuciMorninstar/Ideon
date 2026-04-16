import React from 'react'

const StorySkeleton = () => {
  return (
      <div  className = "flex flex-col gap-2 items-center justify-center animate-pulse  ">
        {/* for image */}
        <div className = "w-full h-full rounded-full border-3 border-secondary-background p-1">
        <div className = " w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden bg-secondary-background ">
           
        </div>
          </div>

        <span className ="w-16 h-3 bg-secondary-background rounded"></span>

    </div>
  )
}

export default StorySkeleton