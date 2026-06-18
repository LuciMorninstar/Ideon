import { create } from "zustand";

export const useStoryStore = create((set,get)=>({
    storyPopup:false,
    openStoryId:null,

    setStoryPopup:()=>{
        set({storyPopup:!get().storyPopup});
    },
    closeStoryPopup:()=>{
        set({storyPopup:false})
    },


    setOpenStoryId:(id)=>{
        set({openStoryId:id})
    }
}))