import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPosts,createPost, toggleBookmarks, getPostsByUserId, reactToPost } from "../api/postApi";
import { useQueryClient } from "@tanstack/react-query";

export const useGetAllPosts = ()=>{
    return useQuery({
        queryKey:["allPosts"],
        queryFn:getAllPosts

    })

}



export const useCreatePost = ()=>{
    return useMutation({
        mutationFn:(formData)=>createPost(formData)
    })
}

export const useToggleBookmarks = ()=>{
    return useMutation({
        mutationFn:(postId)=>toggleBookmarks(postId)

    })
}

export const useGetPostsByUserId = (userId)=>{
    return useQuery({
        queryKey:["posts",userId],
        queryFn:()=>getPostsByUserId(userId)
    })
}

export const useReactToPost = ()=>{


    return useMutation({
        mutationFn:({postId,reactionType})=>reactToPost({postId,reactionType}),
    
    })

}