import {create} from "zustand"

export const useMessageStore = create((set,get)=>({
    isMessageOpen:false,
    activeTab:"chats",


    toggleMessageOpen: ()=>set({isMessageOpen:!get().isMessageOpen}),

    setActiveTab : (tab)=> set({activeTab:tab}),
    

}))