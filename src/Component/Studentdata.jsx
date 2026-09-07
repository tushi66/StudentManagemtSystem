import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Studentdata = () => {
    const [studentdata, SetStudentData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchdata = async () => {
            
            try {
                const res = await axios.get("http://localhost:5000/student");

                SetStudentData(res);

                console.log(res);
                

            } catch (error) {
                console.log(error);
            }
        };

        fetchdata();
    }, []);


    const filteredStudents = [...studentdata]
        .filter((student) => {
            
            if (search) {
                const value =
                    searchBy === "name"
                        ? student.name
                        : student.email;

                if (
                    !value
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                ) {
                    return false;
                }
            }

            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "az") {
                return a.name.localeCompare(b.name);
            }

            if (sortOrder === "za") {
                return b.name.localeCompare(a.name);
            }

            return 0;
        });

    const totalPages = Math.ceil(
        filteredStudents.length / rowsPerPage
    );

    const startIndex =
        (currentPage - 1) * rowsPerPage;

    const currentStudents = filteredStudents.slice(
        startIndex,
        startIndex + rowsPerPage
    );

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchBy = (e) => {
        setSearchBy(e.target.value);
        setSearch("");
        setCurrentPage(1);
    };

    const handleSort = (e) => {
        setSortOrder(e.target.value);
        setCurrentPage(1);
    };

    const handleCityFilter = (e) => {
        setCityFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleRowsPerPage = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleEdit = (id) => {
        const student = studentdata.find(
            (item) => item.id === id
        );

        if (!student) return;

        const newName = prompt(
            "Enter new student name:",
            student.name
        );

        if (newName && newName.trim() !== "") {
            SetStudentData(
                studentdata.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              name: newName,
                          }
                        : item
                )
            );
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        SetStudentData(
            studentdata.filter(
                (student) => student.id !== id
            )
        );

        if (
            currentStudents.length === 1 &&
            currentPage > 1
        ) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container py-4">

            <h1 className="h3 fw-semibold text-center mb-4">
                Student Data Table Management
            </h1>

            <div className="row g-3 align-items-center mb-4">

                <div className="col-12 col-lg-5">
                    <div className="input-group">

                        <select
                            value={searchBy}
                            onChange={handleSearchBy}
                            className="form-select"
                            style={{ maxWidth: "120px" }}
                        >
                            <option value="name">
                                Name
                            </option>

                            <option value="email">
                                Email
                            </option>
                        </select>

                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder={`Search by ${searchBy}...`}
                            className="form-control"
                        />

                    </div>
                </div>

                <div className="col-12 col-sm-4 col-lg-2">
                    <select
                        value={sortOrder}
                        onChange={handleSort}
                        className="form-select"
                    >
                        <option value="">
                            Sort
                        </option>

                        <option value="az">
                            A → Z
                        </option>

                        <option value="za">
                            Z → A
                        </option>
                    </select>
                </div>

              

                <div className="col-12 col-sm-4 col-lg-3">
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPage}
                        className="form-select"
                    >
                        <option value={5}>
                            5 rows
                        </option>

                        <option value={10}>
                            10 rows
                        </option>
                    </select>
                </div>
            </div>

            <div className="table-responsive border rounded shadow-sm">

                <table className="table table-hover mb-0">

                    <thead className="table-primary">
                        <tr>
                            <th className="px-4 py-3">
                                Name
                            </th>

                            <th className="px-4 py-3">
                                Subjects
                            </th>

                            <th className="px-4 py-3">
                                Marks/Scored
                            </th>

                            <th className="px-4 py-3">
                                Type Of Exam
                            </th>

                            <th className="px-4 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {studentdata.length > 0 ? (

                            studentdata.map((student) => (

                                <tr key={student.id}>

                                    <td className="px-4 py-3 fw-medium">
                                        {student.Name}
                                    </td>

                                    <td className="px-4 py-3 text-secondary">
                                        {student.Subjects}
                                    </td>

                                    <td className="px-4 py-3 text-secondary">
                                        {student.Marks}
                                    </td>

                                    <td className="px-4 py-3 text-secondary">
                                        {student.TypeofExam}
                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        <div className="d-flex justify-content-center gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(
                                                        student.id
                                                    )
                                                }
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        student.id
                                                    )
                                                }
                                                className="btn btn-outline-danger btn-sm"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center text-secondary py-4"
                                >
                                    No students found
                                </td>
                            </tr>

                        )}

                    </tbody>
                </table>
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-3">

                <p className="text-secondary mb-0">

                    Showing{" "}

                    {filteredStudents.length === 0
                        ? 0
                        : startIndex + 1}

                    {" - "}

                    {Math.min(
                        startIndex + rowsPerPage,
                        filteredStudents.length
                    )}

                    {" of "}

                    {filteredStudents.length}

                </p>

                <div className="d-flex align-items-center gap-2">

                    <button
                        onClick={previousPage}
                        disabled={currentPage === 1}
                        className="btn btn-outline-secondary btn-sm"
                    >
                        Previous
                    </button>

                    <span className="px-2">
                        Page {currentPage} of{" "}
                        {totalPages || 1}
                    </span>

                    <button
                        onClick={nextPage}
                        disabled={
                            currentPage === totalPages ||
                            totalPages === 0
                        }
                        className="btn btn-outline-secondary btn-sm"
                    >
                        Next
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Studentdata;
