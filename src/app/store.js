import { configureStore } from "@reduxjs/toolkit";
import examReducer from "../Fetures/exam/examSlice.jsx";

const store = configureStore({
  reducer: {
    exams: examReducer,
  },
});

export default store;