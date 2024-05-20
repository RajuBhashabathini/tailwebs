import { createSlice } from "@reduxjs/toolkit";
import dataSource from "../../../mockData/dataSource";

const initialState = {
  value: dataSource,
};

export const studentsDataSlice = createSlice({
  name: "studentDetails",
  initialState,
  reducers: {
    addUserData: (state) => {
      state.value += 1;
    },
    editUserData: (state) => {
      state.value -= 1;
    },
    deleteUserData: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserData, editUserData, deleteUserData } =
  studentsDataSlice.actions;

export default studentsDataSlice.reducer;
