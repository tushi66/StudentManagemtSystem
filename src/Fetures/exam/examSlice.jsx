import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/student";

export const fetchExams = createAsyncThunk(
    "exams/fetchExams",
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
);

export const addExam = createAsyncThunk(
    "exams/addExam",
    async (examData) => {
        const response = await axios.post(API_URL, examData);
        return response.data;
    }
);

export const deleteExam = createAsyncThunk(
    "exams/deleteExam",
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

const examSlice = createSlice({
    name: "exams",

    initialState: {
        exams: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // FETCH
            .addCase(fetchExams.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchExams.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = action.payload;
            })

            .addCase(fetchExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // ADD
            .addCase(addExam.fulfilled, (state, action) => {
                state.exams.push(action.payload);
            })

            // DELETE
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.exams = state.exams.filter(
                    (exam) => exam.id !== action.payload
                );
            });
    }
});

export default examSlice.reducer;