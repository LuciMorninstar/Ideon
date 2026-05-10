import React, {  useState } from "react";
import signUp from "../assets/signup(Ide).png";
import { Link } from "react-router";

import { useSignIn } from "../hooks/useAuth";
import { Loader } from 'lucide-react';
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";



const SignInPage = () => {

    const navigate = useNavigate();

  const {mutate:signInMutation, isPending, isSuccess, isError} = useSignIn();

  const setUser = useAuthStore((state)=>state.setUser);

  const [formData, setFormData] = useState({ email:"", password:""});
  console.log(formData);


  const handleSignIn = (e) => {
    e.preventDefault();

    signInMutation(formData,{
      onSuccess:(data)=>{
       

        setUser(data?.user);
        setFormData({ email:"", password:""});
        toast.success("Sign In Successful");
        navigate("/")   
      },

      onError:(err)=>{
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    })


  };
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 space-x-5 bg-primary-background h-screen ">
      {/* left part - hidden in less than xl sizes */}
      <div className="w-full h-full  overflow-hidden bg-green-500 max-xl:hidden">
        <img
          src={signUp}
          className="w-full h-full object-cover object-center"
          alt="signUp image"
        />
      </div>

      {/* right part */}

      <div className=" relative w-full h-full  overflow-hidden flex flex-col items-center justify-center rounded-l-4xl bg-primary-background">

      {/* form small screen less than xl sizes */}
         <div className=" absolute top-0 left-0  opacity-60 w-full h-full rounded-r-4xl overflow-hidden bg-green-500 xl:hidden pointer-events-none ">
        <img
          src={signUp}
          className="w-full h-full object-cover object-center"
          alt="signUp image"
        />
      </div>
      {/* /absolute image ends */}

        <form
        className ="flex w-full flex-col gap-3 items-center  "
         onSubmit={handleSignIn} 
         >
          <h3 className ="mb-5 brightness-90
          ">Sign In To Your Ideon Account</h3>
            {/* first part */}
         

          {/* field part */}

          <div className="w-full px-15 sm:px-20 md:px-40 lg:px-60  xl:px-30 2xl:px-40 flex flex-col gap-2 brightness-100 ">
            
            <div className ="form_input_wrapper">
              <label>Email</label>
            <input
              className="form_input_style"
              type="email"
              name="email"
              placeholder="Type your Email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
            />
            </div>

            <div className ="form_input_wrapper">
              <label>Password</label>
            <input
              className="form_input_style"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Create a password"
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
            />
            </div>

            <button disabled={isPending} className = " mb-2 py-2 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-400 rounded-2xl mt-3 font-semibold cursor-pointer flex flex-row items-center justify-center">{ isPending ? <Loader className = "animate-spin" /> :  "Sign In"}</button>

            <span>Don't Have an account? <Link to = "/signUp" className = "text-blue-500 ">Sign Up </Link></span>

            {/* <span>{isSuccess ? "Sucess":"Not success"}</span>
            <span>{isError ? "Error":"Not error"}</span> */}

            
          
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignInPage;
