import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    query: "",
  },
  reducers: {
    changeFilter(state, action) {
      state.query = action.payload;
    },
    resetFilter(state) {
      state.query = "";
    },
  },
});

export const { changeFilter, resetFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
