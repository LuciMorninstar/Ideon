import { axiosInstance as axios } from "../utils/axios.js";

export const getConversationMessages = async(friendId)=>{
    const response = await axios.get(`/message/${friendId}`);
    return response.data.messages;
}

export const getMyMessages = async()=>{
    const response = await axios.get("/message");
    return response.data.myMessages;
}

export const sendMessage = async({formData,selectedUserId})=>{
    const response = await axios.post(`/message/${selectedUserId}`, formData);
    return response.data.message;
}