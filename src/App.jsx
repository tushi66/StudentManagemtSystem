import React from "react";
import { Routes, Route } from "react-router-dom";

import Headers from "./Component/Header";

import Studentdata from "./pages/Studentdata";
import AddStudentData from "./pages/AddStudentData";
import UserProfile from "./pages/UserProfile";
import Signin from "./pages/Signin";
import Register from "./pages/Register";

const App = () => {
    return (
        <>
            <Headers />

            <Routes>

                <Route
                    path="/"
                    element={<Studentdata />}
                />

                <Route
                    path="/add-student"
                    element={<AddStudentData />}
                />

                <Route
                    path="/student-list"
                    element={<Studentdata />}
                />

                <Route
                    path="/user-profile"
                    element={<UserProfile />}
                />

                <Route
                    path="/signin"
                    element={<Signin />}
                />

                <Route path="/register" element={<Register />} />


            </Routes>
        </>
    );
};

export default App;