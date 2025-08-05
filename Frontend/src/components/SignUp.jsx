import React from 'react';
import { Link, Navigate, useLocation,useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Login from './Login';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const Signup = () => 
  {
    const Navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname||"/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
  const userInfo={
  fullname:data.fullname,
  emailid:data.emailid,
  password:data.password 

}  
await axios.post("https://bookstoreapp-1-dxg9.onrender.com/signup",userInfo)
.then((res)=>{
  console.log(res.data)
  if(res.data){
    //alert("User created successfully")
    toast.success("User created successfully");
    Navigate(from ,{replace:true})
  }
  localStorage.setItem("Users",JSON.stringify(res.data.user));

}).catch((err)=>{
  if(err.response){
    console.log(err)
    //alert("Errror"+err.response.data.message);
    toast.error(err.response.data.message);
  }
  
})
};

  return (
<div className="flex items-center justify-center min-h-screen p-4 flex-col">
  <div className="w-full text-center mb-8">
  <a href="/" className="btn btn-ghost text-2xl">bookStore</a>
</div>

      <div className="w-full max-w-md relative">

        {/* Close (Cross) Button - Top Right - UNCHANGED */}
        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">
          ✕
        </Link>

        <h3 className="font-bold text-lg text-left mb-4">Signup</h3>

        {/* Fullname Field - Only added register and error */}
        <div className="mt-4 space-y-2">
          <label className="block">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border rounded-md outline-none"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        {/* Email Field - Only added register and error */}
        <div className="mt-4 space-y-2">
          <label className="block">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md outline-none"
            {...register("emailid", { required: true })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        {/* Password Field - Only added register and error */}
        <div className="mt-4 space-y-2">
          <label className="block">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md outline-none"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        {/* Signup Button - Added form submit handler */}
        <div className="flex flex-col items-center mt-6 space-y-4">
          <button 
            onClick={handleSubmit(onSubmit)}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 w-full"
          >
            Signup
          </button>
          <p className="text-center">
            Already registered?{' '}
            <button 
              className="underline text-blue-500 cursor-pointer"
              onClick={() => document.getElementById('my_modal_3').showModal()}
            >
              Login
            </button>
          </p>
          <Login/>
        </div>
      </div>
    </div>
  );
};

export default Signup;