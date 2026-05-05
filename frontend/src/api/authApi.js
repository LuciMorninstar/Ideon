import { axiosInstance as axios } from "../utils/axios";

export const signUp = async (formData)=>{

    const response = await axios.post("/auth/signup", formData);
    return response.data.user;
}

export const signIn = async(formData)=>{
    
    const response = await axios.post("/auth/signIn", formData);
    return response.data.user;
}