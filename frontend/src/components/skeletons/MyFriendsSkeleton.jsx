import React from "react";

const MyFriendsSkeleton = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full px-5">

      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="flex flex-row items-center gap-3 rounded-full p-2 animate-pulse"
        >
          
          {/* image skeleton */}
          <div className="w-20 h-20 rounded-full bg-secondary-background animate-pulse shrink-0"></div>

          {/* text skeleton */}
          <div className="flex flex-col w-full gap-2">
            <div className="h-4 w-1/2 bg-secondary-background animate-pulse rounded-2xl"></div>
            <div className="h-3 w-2/3 bg-secondary-background animate-pulse rounded-2xl"></div>
          </div>

          {/* button skeleton */}
          <div className="h-8 w-20 bg-secondary-background animate-pulse rounded-full"></div>

        </div>
      ))}

    </section>
  );
};

export default MyFriendsSkeleton;