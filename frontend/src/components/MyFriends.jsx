import React, { useState } from "react";
import { useGetAllMyFriends, useUnFriend } from "../hooks/useUser";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import MyFriendsSkeleton from "./skeletons/MyFriendsSkeleton"

const MyFriends = () => {

    const queryClient = useQueryClient();

    const [loadingId, setLoadingId] = useState(null);

  const { isPending, isError, data: friends, error } = useGetAllMyFriends();

  console.log(friends, "myfriends");

  const { mutate: useUnFriendMutation, isPending: friendRemovingPending } =
    useUnFriend();

  const handleRemoveFromFriend = (e, id) => {
    e.preventDefault();

    setLoadingId(id);

    useUnFriendMutation(id, {
      onSuccess: () => {
        toast.success("Removed From FriendList");
        setLoadingId(null);
        queryClient.invalidateQueries({queryKey:['allMyFriends']});


      },    
      onError: (err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something Went wrong");
        setLoadingId(null);
      },
    });

};

if (isPending) return (<MyFriendsSkeleton/>);
if (isError) return "Error fetching MyFriends";
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2  gap-3 w-full px-5">
      {(friends || []).map((friend, i) => (
        <div
          key={friend._id}
          className="flex flex-row justify-center items-center gap-3  rounded-full p-2  "
        >
          {/* for image */}
          <div className="w-20 h-20 rounded-full shrink-0">
            <img
              src={friend?.profilePic?.url}
              alt="profilePic"
              className="h-full w-full object-cover object-center rounded-full"
            />
          </div>

          {/* for name and username */}
          <div className=" flex flex-col w-full gap-0 ">
            <span className="font-semibold">{friend?.name}</span>
            <span className="text-xs md:text-xs lg:text-sm ">
              {friend?.email}
            </span>
          </div>

          <div>
            <button
              onClick={(e) => handleRemoveFromFriend(e, friend?._id)}
              className="button_style text-xs lg:text-sm xl:text-base"
            >
              {loadingId === friend?._id ? (
                <Loader className="animate-spin" />
              ) : (
                "Remove"
              )}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MyFriends;
