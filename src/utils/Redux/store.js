import { configureStore } from "@reduxjs/toolkit";
import studentsDataSlice from "./slices/studentsDataSlice";

export const store = configureStore({
  reducer: {
    studentsDataSlice: studentsDataSlice,
  },
});
