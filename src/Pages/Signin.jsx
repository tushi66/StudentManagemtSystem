import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import "./Signin.css";

const Signin = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.email ||
            !formData.password
        ) {

            alert("Please enter email and password");

            return;
        }

        alert("Sign in successful!");

        navigate("/");

    };


    return (

        <div className="signin-page">

            <div className="signin-card">

                <div className="signin-icon">
                    👤
                </div>

                <h1>
                    Welcome Back
                </h1>

                <p>
                    Sign in to your account
                </p>


                <form onSubmit={handleSubmit}>

                    <div className="signin-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                    </div>


                    <div className="signin-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />

                    </div>


                    <button
                        type="submit"
                        className="signin-button"
                    >
                        SIGN IN
                    </button>

                    <p className="create-account">
                        <Link to="/register">
                            Create A New Account
                        </Link>
                    </p>
                </form>

            </div>

        </div>

    );
};

export default Signin;