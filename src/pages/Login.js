import React from 'react'
import Template from '../components/Template'
import loginImg from "../components/assets/login.png"

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Order your food now and let your hunger calm"
      desc2="Just few steps to setup ur account"
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login
