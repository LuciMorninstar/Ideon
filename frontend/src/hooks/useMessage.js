import {useMutation, useQuery} from "@tanstack/react-query";
import {getConversationMessages, getMyMessages} from "../api/messageApi";


export const useGetConversationMessages = (friendId)=>{
    return useQuery({
        queryKey:["messages", friendId],
        queryFn:()=>getConversationMessages(friendId),
        enabled: !! friendId

    })
}