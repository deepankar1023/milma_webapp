import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../utils/auth';

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const [formData, setFormData] = useState({
        email: "", password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    const checkServerConnection = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/ping`);
            console.log("✅ Server Response:", response.data); // Debugging log
            return true;
        } catch (error) {
            console.error("❌ Server Connection Error:", error.message);
            console.error("🔴 Full Error Details:", error);
            return false;
        }
    };
    

    const submitHandler = async (event) => {
        event.preventDefault();
        const isServerConnected = await checkServerConnection();
        if (!isServerConnected) {
            toast.error("Cannot connect to the server. Please try again later.");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/login`,
                formData,
                {
                    withCredentials: true // Ensure cookies/token are sent and received
                }
            );
            storeTokenInLS(response.data.token);
            setIsLoggedIn(true);
            toast.success("Logged In");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Failed to login");
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Email Address<sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter email address"
                        name="email"
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>

                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Password<sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        name="password"
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span
                        className='absolute right-3 top-[38px] cursor-pointer'
                        onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? 
                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : 
                            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                    </span>
                    <Link to="#">
                        <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                            Forgot Password
                        </p>
                    </Link>
                </label>

                <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Sign In
                </button>
            </form>
        </>
    );
};

export default LoginForm;
