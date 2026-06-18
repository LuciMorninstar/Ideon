import { getAllMySavedPosts, addToSavedPosts, deleteAllMySavedPosts, deleteSingleSavedPost } from "../api/savedPostsApi"
import { useMutation, useQuery } from "@tanstack/react-query";


export const useGetAllMySavedPosts = ()=>{
    return useQuery({
        queryKey:["savedPosts"],
        queryFn:getAllMySavedPosts
    })
}

export const useAddToSavedPosts = ()=>{
    return useMutation({
        mutationFn:(postId)=>addToSavedPosts(postId)
    })
}

export const useDeleteSingleSavedPost = ()=>{
    return useMutation({
        mutationFn:(postId)=>deleteSingleSavedPost(postId)
    })
}

export const useDeleteAllMySavedPosts = ()=>{
    return useMutation({
        mutationFn:deleteAllMySavedPosts
    })
}