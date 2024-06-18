import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './LoginForm.css';

const LoginForm = ({ setIsLoggedIn }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    toast.success("Logged In");
    console.log("Printing the formData ");
    console.log(formData);
    navigate("/dashboard");
  }

  return (
    <form onSubmit={submitHandler} className="login-form">
      <label className='login-label'>
        <p className='login-label-text'>
          Email Address<sup className='required-marker'>*</sup>
        </p>
        <input
          required
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter email address"
          name="email"
          className='login-input'
        />
      </label>

      <label className='login-label relative'>
        <p className='login-label-text'>
          Password<sup className='required-marker'>*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className='login-input'
        />

        <span
          className='password-toggle'
          onClick={() => setShowPassword(prev => !prev)}>
          {showPassword ?
            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
        </span>

        <Link to="#">
          <p className='forgot-password-link'>
            Forgot Password
          </p>
        </Link>
      </label>

      <button className='login-button'>
        Sign In
      </button>
    </form>
  )
}

export default LoginForm;
