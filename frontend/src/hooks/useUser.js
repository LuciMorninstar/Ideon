import { useMutation, useQuery } from "@tanstack/react-query";
import { addAsFriend, getAllMyFriends, getAllUsers, unfriend } from "../api/userApi";
export const useGetAllUsers = ()=>{
    return useQuery({
        queryKey:["allUsers"],
        queryFn:getAllUsers

    })
}

export const useGetAllMyFriends = ()=>{
    return useQuery({
        queryKey:["allMyFriends"],
        queryFn:getAllMyFriends
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