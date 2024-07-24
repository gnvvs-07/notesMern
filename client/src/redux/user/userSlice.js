import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  currentUser: null,
  error_redux: null,
};

// slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login
    loginStart: (state) => {
      state.error_redux = null;
    },
    loginSuccess: (state, action) => {
      state.error_redux = null;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.error_redux = action.payload;
    },
  },
});

// export the reducers
export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;

// default reducer
export default userSlice.reducer;
