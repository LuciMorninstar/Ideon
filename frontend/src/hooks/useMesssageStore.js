import {create} from "zustand"

export const useMessageStore = create((set,get)=>({
    isMessageOpen:false,
    activeTab:"chats",
    selectedUser:null,


    toggleMessageOpen: ()=>set({isMessageOpen:!get().isMessageOpen}),

    setActiveTab : (tab)=> set({activeTab:tab}),

    setSelectedUser : (friendId)=> set({selectedUser:friendId}),
    

}))