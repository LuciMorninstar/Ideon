import { useMutation, useQuery } from "@tanstack/react-query";
import { addAsFriend, getFriendsByUserId, getAllUsers, getUserDetails, unfriend } from "../api/userApi";
export const useGetAllUsers = ()=>{
    return useQuery({
        queryKey:["allUsers"],
        queryFn:getAllUsers

    })
}

export const useGetFriendsByUserId = (userId)=>{
    return useQuery({
        queryKey:["friends",userId],
        queryFn:()=>getFriendsByUserId(userId)
    })
}

export const useAddAsFriend = ()=>{
    return useMutation({
        mutationFn:(id)=>addAsFriend(id)
    })
}

export const useUnFriend = ()=>{
    return useMutation({
        mutationFn:(id)=>unfriend(id)
    })
}

export const useGetUserDetails = (userId)=>{
    return useQuery({
        queryKey:["user",userId],
        queryFn:()=>getUserDetails(userId),
        enabled:!!userId
    })
}