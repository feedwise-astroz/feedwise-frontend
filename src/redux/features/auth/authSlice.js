import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("fullname"));

const initialState = {
  isLoggedIn: false,
  fullname: name ? name : "",
  user: {
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
   // photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.fullname = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.fullname = profile.fullname;
      state.user.email = profile.email;
    
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.fullname;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;