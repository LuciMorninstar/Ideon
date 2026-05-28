import React from 'react'
import ProfilePic from './ProfilePic'
import { useAuthStore } from '../stores/useAuthStore'
import MessageBoxSidebar from './MessageBoxSidebar';
  import { GiCrossMark } from "react-icons/gi";
import { useMessageStore } from '../hooks/useMesssageStore';


const MessageBox = () => {
  const user = useAuthStore((state)=>state.user);
  const toggleMessageOpen = useMessageStore((state)=>state.toggleMessageOpen);
  const isMessageOpen = useMessageStore((state)=>state.isMessageOpen);

  const handleCloseMessageBox = (e)=>{
    e.preventDefault();
    toggleMessageOpen();

  }
  return (
   <section
  className={`absolute z-90 bottom-10 right-10 w-2xl h-99 bg-secondary-background rounded-2xl p-1 grid grid-cols-[2fr_3fr]
  origin-bottom-right transition-all duration-300 ease-out
  ${isMessageOpen
    ? "scale-100 opacity-100"
    : "scale-90 opacity-0 pointer-events-none"
  }`}
>
      <MessageBoxSidebar/>
      <div>
        something
      </div>

      {/* // absolute close button */}
        {/* absolute cancel */}
                <span
                  onClick={(e) => handleCloseMessageBox(e)}
                  className=" bg-primary-background p-3 rounded-full absolute right-2 top-2 cursor-pointer"
                >
                  <GiCrossMark />
                </span>


    </section>
  )
}

export default MessageBox