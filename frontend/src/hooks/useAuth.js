import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/authApi";

export const useSignUp = ()=>{
    return useMutation({
        mutationFn:(formData)=>signUp(formData)
    })

}