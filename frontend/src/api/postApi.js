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
    const response = await axios.patch(`/post/toggleBookmarks/${postId}`);
    return response.data;
}

export const getPostsByUserId = async(userId)=>{
    const response = await axios.get(`/post/${userId}`);
    return response.data.posts;
}

export const reactToPost = async({postId, reactionType})=>{
    const response = await axios.patch(`/post/react/${postId}`,reactionType);
    return response.data.reactions;
}

// export const getBookmarks = async(filter)=>{
//     const response = await axios.get(`/post/bookmarks`)
// }

export const getBookmarkedPosts = async()=>{
    const response = await axios.get("/post/bookmarkedPosts");
    return response.data.bookmarkedPosts;
}

