import { createSlice } from "@reduxjs/toolkit";
import dataSource from "../../../mockData/dataSource";

const initialState = {
  value: dataSource,
};

export const studentsDataSlice = createSlice({
  name: "studentDetails",
  initialState,
  reducers: {
    studentData: (state, action) => {
      console.log("action in studentData ", state, action);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { studentData } = studentsDataSlice.actions;

export default studentsDataSlice.reducer;
