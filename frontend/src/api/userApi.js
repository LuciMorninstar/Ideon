
import { axiosInstance as axios } from "../utils/axios"

export const getAllUsers = async()=>{

    const response = await axios.get("/user");
    return response.data.users;
    
}

export const getAllMyFriends = async()=>{
    const response = await axios.get("/user/myFriends");
    return response.data.friends;

}

export const addAsFriend = async(id)=>{
    const response = await axios.post(`/user/${id}`);
    return response.data.friendId;

}

export const unfriend = async(id)=>{
    const response = await axios.patch(`/user/${id}`);
    return response.data;
} 