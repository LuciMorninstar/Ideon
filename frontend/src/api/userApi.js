
import { axiosInstance as axios } from "../utils/axios"

export const getAllUsers = async()=>{

    const response = await axios.get("/user");
    return response.data.users;
    
}