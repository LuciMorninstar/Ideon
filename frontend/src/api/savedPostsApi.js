import {axiosInstance as axios} from "../utils/axios.js";

export const getAllMySavedPosts = async()=>{
    const response = await axios.get("/savedPosts");
    return response.data.mySavedPosts;

}

export const addToSavedPosts = async(postId)=>{
    const response = await axios.post(`/savedPosts/${postId}`);
    return response.data.message;

}


export const deleteSingleSavedPost = async(postId)=>{
    const response = await axios.delete(`/savedPosts/${postId}`);
    return response.data.message;
}

export const deleteAllMySavedPosts = async()=>{
    const response = await axios.delete("/savedPosts");
    return response.data.message;
}



