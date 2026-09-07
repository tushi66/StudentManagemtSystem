import { useEffect, useState } from "react";
import axios from "axios";
import "./Studentdata.css";
import picture from "../assets/p1.png"
const Studentdata = () => {

    const [studentdata, setStudentData] = useState([]);

    const [search, setSearch] = useState("");
    const [examFilter, setExamFilter] = useState("All");

    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        marks: "",
        typeOfExam: "Class Exam"
    });

    const [showForm, setShowForm] = useState(false);

    const API_URL = "http://localhost:5000/student";


    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const res = await axios.get(API_URL);

                setStudentData(res.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchStudents();

    }, []);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleAddStudent = async (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.subject ||
            !formData.marks
        ) {

            alert("Please fill all fields");

            return;

        }


        try {

            const newStudent = {

                name: formData.name,

                subject: formData.subject,

                marks: Number(formData.marks),

                typeOfExam: formData.typeOfExam

            };


            const res = await axios.post(
                API_URL,
                newStudent
            );


            setStudentData([
                ...studentdata,
                res.data
            ]);


            setFormData({
                name: "",
                subject: "",
                marks: "",
                typeOfExam: "Class Exam"
            });


            setShowForm(false);


        } catch (error) {

            console.log(error);

            alert("Student could not be added");

        }

    };


    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this student?"
            );


        if (!confirmDelete) return;


        try {

            await axios.delete(
                `${API_URL}/${id}`
            );


            setStudentData(
                studentdata.filter(
                    student =>
                        student.id !== id
                )
            );


        } catch (error) {

            console.log(error);

        }

    };


    const handleEdit = async (student) => {

        const newName = window.prompt(
            "Enter student name:",
            student.name
        );


        if (
            !newName ||
            newName.trim() === ""
        ) {
            return;
        }


        try {

            const updatedStudent = {
                ...student,
                name: newName.trim()
            };


            await axios.put(
                `${API_URL}/${student.id}`,
                updatedStudent
            );


            setStudentData(
                studentdata.map(item =>
                    item.id === student.id
                        ? updatedStudent
                        : item
                )
            );


        } catch (error) {

            console.log(error);

        }

    };


    const filteredStudents =
        studentdata.filter(student => {

            const matchesSearch =
                student.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                student.subject
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const matchesExam =
                examFilter === "All"
                    ? true
                    : student.typeOfExam ===
                      examFilter;


            return (
                matchesSearch &&
                matchesExam
            );

        });



    const totalStudents =
        studentdata.length;

    const totalSubjects =
        new Set(
            studentdata.map(
                student => student.subject
            )
        ).size;

    const totalExams =
        studentdata.length;


    return (

        <div className="student-page">


            <div className="student-header">

                <div className="header-inner">

                    <div className="profile-section">

                        <div className="profile-image">

                            <img
                                src={picture}
                                alt="Teacher"
                            />

                        </div>


                        <div>

                            <h2>
                                Pritam Shah
                            </h2>

                            <p>
                                RW International School
                            </p>

                        </div>

                    </div>



                    <div className="statistics">

                        <div className="stat">

                            <h3>
                                {totalStudents}
                            </h3>

                            <span>
                                Students
                            </span>

                        </div>


                        <div className="stat">

                            <h3>
                                {totalSubjects}
                            </h3>

                            <span>
                                Subjects
                            </span>

                        </div>


                        <div className="stat">

                            <h3>
                                {totalExams}
                            </h3>

                            <span>
                                Exams
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* // add form */}

            <div className="add-section">

                <div className="student-icon">

                    <span>+</span>

                    👤

                </div>


                <form
                    onSubmit={handleAddStudent}
                    className="student-form"
                >

                    <div className="input-box">

                        <label>
                            Student's Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Student Name"
                        />

                    </div>


                    <div className="input-box">

                        <label>
                            Subject
                        </label>

                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select from list
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


                    <div className="input-box marks-box">

                        <label>
                            Marks Scored
                        </label>

                        <input
                            type="number"
                            name="marks"
                            value={formData.marks}
                            onChange={handleChange}
                            placeholder="00 / 00"
                            min="0"
                            max="100"
                        />

                    </div>


                    <div className="input-box">

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


                    <button
                        type="submit"
                        className="add-button"
                    >
                        ADD NOW
                    </button>

                </form>

            </div>


            {/* // Table manage  */}

            <div className="student-content">


                <div className="filter-row">

                    <div className="exam-tabs">

                        <button
                            className={
                                examFilter === "All"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setExamFilter("All")
                            }
                        >
                            All
                        </button>


                        <button
                            className={
                                examFilter === "Class Exam"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setExamFilter(
                                    "Class Exam"
                                )
                            }
                        >
                            Class Exam
                        </button>


                        <button
                            className={
                                examFilter === "Online Exam"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setExamFilter(
                                    "Online Exam"
                                )
                            }
                        >
                            Online Exam
                        </button>


                        <button
                            className={
                                examFilter === "Missed Exam"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setExamFilter(
                                    "Missed Exam"
                                )
                            }
                        >
                            Missed Exam
                        </button>

                    </div>


                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Search student..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                        <span>
                            🔍
                        </span>

                    </div>

                </div>


                <div className="table-header">

                    <div>
                        Name
                    </div>

                    <div>
                        Subject
                    </div>

                    <div>
                        Marks Scored
                    </div>

                    <div>
                        Type of Exam
                    </div>

                    <div>
                        Action
                    </div>

                </div>


                <div className="students-list">

                    {filteredStudents.length > 0 ? (

                        filteredStudents.map(
                            (student) => (

                                <div
                                    className="student-row"
                                    key={student.id}
                                >

                                    <div className="student-name">

                                        <div className="small-avatar">
                                            👩🏻
                                        </div>

                                        <div>

                                            <strong>
                                                {student.name}
                                            </strong>

                                            <small>
                                                Grade 3
                                            </small>

                                        </div>

                                    </div>



                                    <div className="student-subject">

                                        {student.subject}

                                    </div>



                                    <div className="student-marks">

                                        {student.marks}
                                        {" / 100"}

                                    </div>



                                    <div>

                                        <span
                                            className={`exam-status ${
                                                student.typeOfExam
                                                    ?.toLowerCase()
                                                    .replace(
                                                        " ",
                                                        "-"
                                                    )
                                            }`}
                                        >

                                            {student.typeOfExam}

                                        </span>

                                    </div>



                                    <div className="actions">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                handleEdit(
                                                    student
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    student.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            )

                        )

                    ) : (

                        <div className="no-data">

                            No students found

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};


export default Studentdata;