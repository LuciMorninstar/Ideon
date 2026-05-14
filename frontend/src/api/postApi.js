import {axiosInstance as axios} from "../utils/axios.js";
export const getAllPosts = async()=>{
    const response = await axios.get("/post");
    return response.data.posts;

}

export const createPost = async(formData)=>{
    const response = await axios.post("/post", formData);
    return response.data.post;

}

export const toggleBookmarks = async(postId)=>{
    const response = await axios.patch(`/user/toggleBookmarks/${postId}`);
    return response.data.isBookmarked;
}