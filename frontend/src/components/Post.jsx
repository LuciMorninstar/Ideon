import React from "react";
import PostActions from "./PostActions";
import PostSkeleton from "./skeletons/PostSkeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuthStore } from "../stores/useAuthStore";

dayjs.extend(relativeTime);

const Post = ({ post }) => {
  return (
    // wrapper
    <div className="flex flex-col gap-2 px-2 py-1 lg:px-4 lg:py-2 border-b border-border-color">
      {/* 1st part */}
      <div className="flex flex-row gap-2 ">
        {/* image */}
        <span className=" w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
          <img
            src={post.owner?.profilePic?.url}
            alt="profilePic"
            className="w-full  h-full object-cover object-center"
          />
        </span>
        {/* name and date */}
        <div className="flex flex-col gap-0">
          <h5>{post.owner?.name}</h5>
          <span className="text-xs text-font-quaternary-color font-semibold">
            {dayjs(post.date).fromNow()}
          </span>
          <span className="text-xs">{post.isEdited && "edited"}</span>
        </div>
      </div>
      {/* 1st part ends */}
      {/* 2nd part */}
      <div className=" ml-14 flex flex-col gap-2">
        <p className=" text-xs sm:text-sm line-clamp-3 text-font-tertiary-color">
          {post.text}
        </p>

        <div className="flex flex-col gap-4">
          {post.images?.length === 1 && (
            <div className=" aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={post.images[0]?.url}
                alt="image"
                className="object-cover object-center w-full h-full"
              />
            </div>
          )}
          {post.images?.length >= 2 && (
            <div className="grid grid-cols-2 gap-1 w-full aspect-[4/3] rounded-2xl">
              {post.images?.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden p-1 bg-secondary-background h-dull rounded-xl"
                >
                  <img
                    src={img.url}
                    alt="image"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
          {post.images?.length >= 5 && (
            <div className="grid grid-cols-3 gap-1 w-full aspect-[4/3] rounded-2xl">
              {post.images?.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden p-1 bg-secondary-background h-dull rounded-xl"
                >
                  <img
                    src={img.url}
                    alt="image"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}

          {post.video && (
            <video controls className="aspect-video rounded-2xl">
              <source src={post.video?.url || null} />
            </video>
          )}
        </div>
      </div>
      {/* 2nd part ends */}

      {/* postActions */}
      <PostActions />
    </div>
    // /wrapper ends
  );
};

export default Post;
