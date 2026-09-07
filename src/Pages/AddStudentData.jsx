import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudentData.css";

const AddStudentData = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        marks: "",
        typeOfExam: "Class Exam"
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


        if (
            !formData.name.trim() ||
            !formData.subject ||
            !formData.marks
        ) {

            alert("Please fill all required fields");

            return;

        }


        if (
            Number(formData.marks) < 0 ||
            Number(formData.marks) > 100
        ) {

            alert("Marks must be between 0 and 100");

            return;

        }


        try {

            setLoading(true);


            const newStudent = {
                name: formData.name.trim(),
                subject: formData.subject,
                marks: Number(formData.marks),
                typeOfExam: formData.typeOfExam
            };


            await axios.post(
                "http://localhost:5000/student",
                newStudent
            );


            alert("Student added successfully!");


            setFormData({
                name: "",
                subject: "",
                marks: "",
                typeOfExam: "Class Exam"
            });


            navigate("/student-list");


        } catch (error) {

            console.log(error);

            alert(
                "Student could not be added. Make sure JSON Server is running."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="add-student-page">


            <div className="add-student-top">

                <div>

                    <h1>
                        Add Student Data
                    </h1>

                    <p>
                        Add student examination details
                    </p>

                </div>

            </div>



            <div className="add-student-container">

                <div className="add-student-card">


                    {/* CARD HEADER */}

                    <div className="card-title">

                        <div className="add-profile-icon">
                            👤
                        </div>

                        <div>

                            <h2>
                                Student Information
                            </h2>

                            <p>
                                Enter the student's exam details
                            </p>

                        </div>

                    </div>



                    <form onSubmit={handleSubmit}>



                        <div className="form-group">

                            <label>
                                Student's Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter student name"
                            />

                        </div>



                        <div className="form-group">

                            <label>
                                Subject
                            </label>

                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Subject
                                </option>

                                <option value="Science">
                                    Science
                                </option>

                                <option value="Maths">
                                    Maths
                                </option>

                                <option value="English Literature">
                                    English Literature
                                </option>

                                <option value="English Grammar">
                                    English Grammar
                                </option>

                                <option value="Environmental Studies">
                                    Environmental Studies
                                </option>

                                <option value="Hindi">
                                    Hindi
                                </option>


                            </select>

                        </div>



                        <div className="form-group">

                            <label>
                                Marks Scored
                            </label>

                            <input
                                type="number"
                                name="marks"
                                value={formData.marks}
                                onChange={handleChange}
                                placeholder="Enter marks"
                                min="0"
                                max="100"
                            />

                            <small>
                                Enter marks between 0 and 100
                            </small>

                        </div>



                        <div className="form-group">

                            <label>
                                Type of Exam
                            </label>

                            <select
                                name="typeOfExam"
                                value={formData.typeOfExam}
                                onChange={handleChange}
                            >

                                <option value="Class Exam">
                                    Class Exam
                                </option>

                                <option value="Online Exam">
                                    Online Exam
                                </option>

                                <option value="Missed Exam">
                                    Missed Exam
                                </option>

                            </select>

                        </div>



                        <div className="form-buttons">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() =>
                                    navigate("/student-list")
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="save-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Saving..."
                                    : "ADD STUDENT"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default AddStudentData;