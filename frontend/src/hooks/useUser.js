import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/userApi";
export const useGetAllUsers = ()=>{
    return useQuery({
        queryKey:["allUsers"],
        queryFn:getAllUsers

    })
}