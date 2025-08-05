import React from 'react';
// Importing Link for navigation to Signup page
import { Link } from 'react-router-dom';
// React Hook Form for form state handling and validation
import { useForm } from "react-hook-form";
// Axios for making HTTP requests
import axios from 'axios';
// Toast for showing popup messages
import { toast } from 'react-hot-toast';
// useNavigate for redirecting, useLocation for accessing previous route info
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  // Hook to programmatically navigate between routes
  const Navigate = useNavigate();
  // Hook to get current location object
  const location = useLocation();

  // Getting the route user came from, or fallback to "/"
  const from = location.state?.from?.pathname || "/";

  // Destructuring form utilities from useForm
  const {
    register,         // Used to register input fields
    handleSubmit,     // Handles form submission
    formState: { errors }, // Contains validation errors
  } = useForm();

  // Function that gets called on form submit
  const onSubmit = async (data) => {
    // Preparing user info payload for login API
    const userInfo = {
      emailid: data.emailid,
      password: data.password
    };

    // Making POST request to login API
    await axios.post("https://bookstoreapp-1-dxg9.onrender.com/user/login", userInfo)
      .then((res) => {
        console.log(res.data);

        if (res.data) {
          // Show success message using toast
          toast.success("Login successfully");

          // Close the login modal
          document.getElementById("my_modal_3").close();

          // Navigate to previous page or homepage
          Navigate(from, { state: { from: location.pathname } });

          // Reload page and store user data in localStorage
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 1000);
        }
      })
      .catch((err) => {
        // If API returns an error
        if (err.response) {
          console.log(err);
          // Show error message from response
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    // Using HTML5 <dialog> element as modal
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        {/* Button to close the modal */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        {/* Login modal title */}
        <h3 className="font-bold text-lg">Login</h3>

        {/* Login form begins */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input Field */}
          <div className="mt-4 space-y-2">
            <label>Email</label>
            <input 
              type="emailid"  // Input type (Note: remains unchanged as per request)
              placeholder="Enter your email" 
              className='w-full px-3 py-1 border rounded-md outline-none'
              {...register("emailid", { required: "Email is required" })}
            />
            {/* Show validation error if any */}
            {errors.emailid && (
              <span className='text-sm text-red-500'>{errors.emailid.message}</span>
            )}
          </div>

          {/* Password Input Field */}
          <div className="mt-4 space-y-2">
            <label>Password</label>
            <input 
              type="password"
              placeholder="Enter your password"
              className='w-full px-3 py-1 border rounded-md outline-none'
              {...register("password", { required: "Password is required" })}
            />
            {/* Show validation error if any */}
            {errors.password && (
              <span className='text-sm text-red-500'>{errors.password.message}</span>
            )}
          </div>

          {/* Login Button and Signup Redirect */}
          <div className="flex justify-between items-center mt-6">
            <button 
              type="submit"
              className='bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-400 duration-300'
            >
              Login
            </button>
            <p>
              Not registered?{' '}
              <Link to="/signup" className='underline text-blue-500'>
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Backdrop click closes the modal */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Login;
