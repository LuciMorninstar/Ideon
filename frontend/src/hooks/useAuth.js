import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "../api/authApi";

export const useSignUp = ()=>{
    return useMutation({
        mutationFn:(formData)=>signUp(formData)
    })

}

export const useSignIn = ()=>{
    return useMutation({
        mutationFn:(formData)=>signIn(formData)
    })
}