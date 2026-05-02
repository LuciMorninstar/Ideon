import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPosts,createPost } from "../api/postApi";

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