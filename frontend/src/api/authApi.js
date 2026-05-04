import { axiosInstance as axios } from "../utils/axios";

export const signUp = async (formData)=>{

    const response = await axios.post("/auth/signUp", formData);
    return response.data.user;
}