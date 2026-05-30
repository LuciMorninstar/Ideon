import React from 'react'
import ProfilePic from './ProfilePic'
import { useAuthStore } from '../stores/useAuthStore'
import { useMessageStore } from '../hooks/useMesssageStore';
import ChatFriendsList from "../components/ChatFriendsList"
import ContactFriendList from "../components/ContactFriendList"

const MessageBoxSidebar = () => {

    const tabs = ["chats", "contacts"];
      const user = useAuthStore((state)=>state.user);
      const activeTab = useMessageStore((state)=>state.activeTab);
       
  const setActiveTab = useMessageStore((state)=>state.setActiveTab);

  const handleActiveTabChange = (e,tab)=>{
    e.preventDefault();
    setActiveTab(tab);

  }
      

  return (
      <aside className = "flex flex-col gap-2 border-r border-border-color p-2 overflow-auto">
      {/* Profile Section */}
      <div className ="flex flex-row gap-3 items-center  pb-2">
        <ProfilePic/>
        <span>
          <h6>{user?.name}</h6>
          <p className = "text-sm">{user?.status || "You"}</p>
          
        </span>
      </div>

      {/* tabs section */}
      <div className = "flex flex-row justify-evenly bg-secondary-background py-2  border-t border-b border-border-color ">
        {tabs.map((tab) => (
            <button key={tab} onClick={(e)=>handleActiveTabChange(e,tab)} className = {` cursor-pointer rounded-3xl text-sm py-1 px-5 transition-all duration-300 ease-in ${activeTab === tab ? "bg-blue-500 text-white":""}`}>
                {tab.slice(0,1).toUpperCase() + tab.slice(1)}
            </button>
        ))}
      </div>

      {/*user lists section */}
      <div className = "flex flex-col gap-1">
        {activeTab === "chats"? <ChatFriendsList/> : <ContactFriendList/>}
        
      </div>

      




    </aside>
  )
}

export default MessageBoxSidebar