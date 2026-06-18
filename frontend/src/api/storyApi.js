import { axiosInstance as axios } from "../utils/axios"
export const showAllStories = async()=>{
    const response = await axios.get("/story/allStories");
    return response.data.stories;


}

export const showFriendStories = async()=>{
    const response = await axios.get("/story/friendStories");
    return response.data.stories;
}

export const getStoryById = async(storyId)=>{
    const response = await axios.get(`/story/${storyId}`);
    return response.data.story;
}

