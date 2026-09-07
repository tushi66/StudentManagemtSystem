import React from "react";
import "./UserProfile.css";

const UserProfile = () => {
    return (
        <div className="profile-page">

            <div className="profile-header">
                <h1>User Profile</h1>
                <p>Manage your profile information</p>
            </div>

            <div className="profile-container">

                <div className="profile-card">

                    <div className="profile-avatar">
                        👤
                    </div>

                    <h2>Teacher Profile</h2>

                    <p className="profile-role">
                        Teacher
                    </p>

                    <div className="profile-details">

                        <div className="profile-item">
                            <span>Name</span>
                            <strong>Pritam Shah</strong>
                        </div>

                        <div className="profile-item">
                            <span>Email</span>
                            <strong>teacher@example.com</strong>
                        </div>

                        <div className="profile-item">
                            <span>School</span>
                            <strong>RW International School</strong>
                        </div>

                        <div className="profile-item">
                            <span>Location</span>
                            <strong>Gujarat</strong>
                        </div>

                    </div>

                    <button className="edit-profile-btn">
                        Edit Profile
                    </button>

                </div>

            </div>

        </div>
    );
};

export default UserProfile;