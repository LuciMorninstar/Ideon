import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance as axios } from "../utils/axios"


export const useAuthStore = create((set,get)=>({
    user:null,

    setUser:(user)=>set({user:user}),
    
    //makes the user logged in even if page is refreshed
    getCurrentUser: async()=>{

        try {
            const response = await axios.get("/auth/getCurrentUser");
            set({user:response.data?.user});
            toast.success("Current user found");

            
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occured while getting the current user")
            
        }

    }
}))