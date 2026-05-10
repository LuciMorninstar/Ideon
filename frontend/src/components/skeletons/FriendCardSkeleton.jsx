import React from 'react'

const FriendCardSkeleton = () => {

    const num = 8;

    return (
        <section className="grid mt-10 grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full">
            
            {Array(num).fill(0).map((_, i) => (
                
                <div
                    key={i}
                    className="w-full px-2 py-2 sm:px-0 sm:py-0 flex flex-row sm:flex-row-reverse gap-4 items-center overflow-hidden  sm:pl-5 sm:border-l-2 border-l-blue-500 rounded-xl animate-pulse"
                >

                    {/* image section */}
                    <div className="sm:w-5/12 sm:overflow-hidden sm:rotate-12 sm:scale-125">

                        <div className="w-30 h-30 sm:w-60 sm:h-60 rounded-full sm:rounded-none overflow-hidden bg-secondary-background">
                        </div>

                    </div>

                    {/* content section */}
                    <div className="flex flex-col gap-2 w-7/12">

                        {/* name */}
                        <span className="w-28 h-4 bg-secondary-background rounded"></span>

                        {/* email */}
                        <span className="w-40 h-3 bg-secondary-background rounded max-sm:hidden"></span>

                        {/* mutual friends */}
                        <span className="w-24 h-3 bg-secondary-background rounded"></span>

                        {/* buttons */}
                        <div className="mt-2 flex flex-row gap-2 md:gap-5 w-full">

                            <span className="w-20 h-8 rounded-full bg-secondary-background"></span>

                            <span className="w-20 h-8 rounded-full bg-secondary-background"></span>

                        </div>

                    </div>

                </div>

            ))}

        </section>
    )
}

export default FriendCardSkeleton