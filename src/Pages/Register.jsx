import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        // Required field validation
        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        // Password length validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        try {
            setLoading(true);

            // Check if email already exists
            const response = await axios.get(
                `http://localhost:5000/users?email=${email}`
            );

            if (response.data.length > 0) {
                alert("Email is already registered");
                return;
            }

            // Create new user
            const newUser = {
                name: name.trim(),
                email: email.trim(),
                password: password
            };

            await axios.post(
                "http://localhost:5000/users",
                newUser
            );

            alert("Registration successful!");

            // Clear form
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            // Go to Sign In
            navigate("/signin");

        } catch (error) {
            console.log(error);
            alert(
                "Registration failed. Please make sure JSON Server is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-icon">
                    👤
                </div>

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Create a new account to continue
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="register-group">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div className="register-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="register-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="register-group">
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                    </button>

                </form>

                <p className="already-account">
                    Already have an account?{" "}
                    <Link to="/signin">
                        Sign In
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;