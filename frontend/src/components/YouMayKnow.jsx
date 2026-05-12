import React from 'react'
import hero from "../assets/hero.png"
import japan from "../assets/japan.jpg"
import moon from "../assets/moon.jpg"
import signup from "../assets/signup(Ide).png"
import { useAddAsFriend, useGetAllUsers } from '../hooks/useUser'
import FriendCardSkeleton from './skeletons/FriendCardSkeleton'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'


const YouMayKnow = () => {

  const [loadingId, setLoadingId] = useState(null); 
  //This loading state is needed so that each id reacts separately of loading. The loading from the tanstack query is for all so each loading is triggered.

  const queryClient = useQueryClient();

    const {isPending, isError, data:users, error} = useGetAllUsers();
    console.log(users, "users");

    const {mutate:addAsFriendMutation,isPending:friendAddingPending  } = useAddAsFriend();

    const handleAddFriend = (e,id)=>{
      e.preventDefault();

      setLoadingId(id);

      addAsFriendMutation(id,{
        onSuccess:()=>{
          toast.success("Added to friendlist");
          queryClient.invalidateQueries({queryKey:['allMyFriends']});
          setLoadingId(null);
        },
        onError:(err)=>{
          console.log(err);
          toast.error(err?.response?.data?.message || "Something went wrong");
            setLoadingId(null);

        }
      })

    }



 
    if(isPending) return <FriendCardSkeleton/>

    if(isError) return (<div> Something Error happened</div>)
        
  return (
    <section className = "grid  grid-cols-1  lg:gap-4 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2  w-full">
        {
            (users || []).map((user,i)=>(
                <div key={user?._id}
                 className = "w-full px-2 py-2 lg:px-0 lg:py-0  flex flex-row lg:flex-row-reverse gap-4 items-center group overflow-hidden even:bg-secondary-background  cursor-pointer lg:pl-5 lg:border-l-2 border-l-blue-500 rounded-2xl   "
                 >
                    {/* left part-for lgall screen right for lg and up */}
                    <div className = " lg:w-5/12 lg:overflow-hidden lg:rotate-12 lg:grayscale-50 lg:scale-130 lg:group-hover:rotate-0 lg:group-hover:scale-100 lg:group-hover:grayscale-0 transition-all duration-200 ease-in  ">
                          {/* for image */}
                     <div className="w-30 h-30 lg:w-48 lg:h-48 xl:w-60 xl:h-60  rounded-full lg:rounded-none overflow-hidden transition-all duration-300 ease-in">
    <img
      src={user?.profilePic?.url}
      alt="profilePic"
      className="w-full h-full object-cover object-csenter"
    />
  </div>

                    </div>

                    {/* right part */}

                    <div className = "flex flex-col gap-1 lg:gap-2 w-7/12 ">
                        
                        <h5>{user?.name || "undefined"}</h5>
                        <span className = "text-xs max-lg:hidden text-font-quaternary-color">{user?.email || "undefined"}</span>
                        <span className = "text-xs text-font-quaternary-color">{user?.mutualFriends || 0} mutual friends</span>

                        {/* for buttons */}
                
                        <span className = "mt-1 flex flex-row gap-2 md:gap-5 w-full ">
                        <button onClick = {(e)=>handleAddFriend(e,user?._id)} className = "button_style text-xs lg:text-sm xl:text-base">{loadingId === user?._id? <Loader className = "animate-spin"/> : "Add Friend"}</button>
                        <button className = "button_style text-xs lg:text-sm xl:text-base">Ignore</button>
                        </span>
    

                    </div>


                
                   
                    
                 </div>

            ))

        }

    </section>
  )
}

export default YouMayKnow