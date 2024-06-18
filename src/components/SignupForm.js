import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import './SignupForm.css'; // Import the custom CSS file

const SignupForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("student");

    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ));
    }

    function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoggedIn(true);
        toast.success("Account Created");
        const accountData = { ...formData, accountType };

        console.log("Printing Final account data ", accountData);

        navigate("/dashboard");
    }

    return (
        <div>
            <div className="account-type-toggle">
                <button
                    className={`account-type-button ${accountType === "student" ? "active" : ""}`}
                    onClick={() => setAccountType("student")}
                >
                    Student
                </button>
                <button
                    className={`account-type-button ${accountType === "instructor" ? "active" : ""}`}
                    onClick={() => setAccountType("instructor")}
                >
                    Instructor
                </button>
            </div>

            <form onSubmit={submitHandler}>
                <div className="input-group">
                    <label className="input-label">
                        First Name<sup>*</sup>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className="input-field"
                        />
                    </label>
                    <label className="input-label">
                        Last Name<sup>*</sup>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className="input-field"
                        />
                    </label>
                </div>

                <label className="input-label">
                    Email Address<sup>*</sup>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address"
                        value={formData.email}
                        className="input-field"
                    />
                </label>

                <div className="input-group">
                    <label className="input-label relative">
                        Create Password<sup>*</sup>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            value={formData.password}
                            className="input-field"
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
                        </span>
                    </label>

                    <label className="input-label relative">
                        Confirm Password<sup>*</sup>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            onChange={changeHandler}
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            className="input-field"
                        />
                        <span
                            className="password-toggle-icon"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} /> : <AiOutlineEye fontSize={24} />}
                        </span>
                    </label>
                </div>

                <button className="submit-button">
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
