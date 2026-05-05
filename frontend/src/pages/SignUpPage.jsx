import React, { useRef, useState } from "react";
import signUp from "../assets/signup(Ide).png";
import { IoCameraOutline } from "react-icons/io5";
import { Link } from "react-router";
import ProfilePic from "../components/ProfilePic";
import { useSignUp } from "../hooks/useAuth";
import { Loader } from 'lucide-react';
import toast from "react-hot-toast";
import { useNavigate } from "react-router";



const SignUpPage = () => {

    const navigate = useNavigate();

  const {mutate:signUpMutation, isPending, isSuccess, isError} = useSignUp();

  const [formData, setFormData] = useState({name:"", email:"", password:"", profilePic:null});
  console.log(formData);

 

  const profilePicRef = useRef(null);

  const handleProfilePicClick = (e) => {
    e.preventDefault();
    profilePicRef.current.click();
  };
  const handleSignUp = (e) => {
    e.preventDefault();

    const sendFormData = new FormData();

  sendFormData.append("name", formData.name);
  sendFormData.append("email", formData.email);
  sendFormData.append("password", formData.password);

  if(formData.profilePic){
    sendFormData.append("profilePic", formData.profilePic);
  }




    signUpMutation(sendFormData,{
      onSuccess:()=>{
        setFormData({name:"", email:"", password:""});
        toast.success("Account created successfully");
        navigate("/signin")
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
         onSubmit={handleSignUp} 
         encType="multipart/form-data">
          <h3 className ="mb-5 brightness-90
          ">Create a Ideon Account</h3>
            {/* first part */}
            <div className="brightness-100 cursor-pointer">

            <input
              ref={profilePicRef}
              type="file"
              className="hidden"
              name="profilePic"
              // value={formData.profilePic}
              onChange = {(e)=>setFormData({...formData,profilePic:e.target.files[0]})}
            />
            {
              formData.profilePic?
              (
              <div className = "size-32 rounded-full overflow-y-hidden">
                <img src={URL.createObjectURL(formData.profilePic)} alt="profilePic" className = "w-full h-full object-cover object-center"/>
              </div>
              )
              :
              (
                  <span
              className="size-32 rounded-full bg-secondary-background flex items-center justify-center text-2xl opacity-80"
              onClick={handleProfilePicClick}
            >
              <IoCameraOutline />
            </span>
              )

            }
          
          </div>

          {/* field part */}

          <div className="w-full px-15 sm:px-20 md:px-40 lg:px-60  xl:px-30 2xl:px-40 flex flex-col gap-2 brightness-100 ">
            <div className ="form_input_wrapper">
              <label>Name</label>
            <input
              className="form_input_style"
              type="text"
              name="name"
              placeholder="Type your name"
              value={formData.name}
              onChange={(e)=>setFormData({...formData, name:e.target.value})}
            />

            </div>
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

            <button disabled={isPending} className = " mb-2 py-2 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-400 rounded-2xl mt-3 font-semibold cursor-pointer flex flex-row items-center justify-center">{ isPending ? <Loader className = "animate-spin" /> :  "Sign Up"}</button>

            <span>Already Have an account? <Link to = "/signin" className = "text-blue-500 ">Sign In</Link></span>

            
          
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
