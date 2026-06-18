import {useQuery, useMutation} from "@tanstack/react-query"
import { getStoryById, showAllStories, showFriendStories } from "../api/storyApi"


export const useShowAllStories = ()=>{
    return useQuery({
        querykey:['allStories'],
        queryFn:showAllStories

    })
}

export const useShowFriendStories = ()=>{
    return useQuery({
        queryKey:['friendStories'],
        queryFn:showFriendStories
    })
}


export const useGetStoryById = (storyId)=>{
    return useQuery({
        queryKey:['story', storyId],
        queryFn:()=>getStoryById(storyId)
    })
}