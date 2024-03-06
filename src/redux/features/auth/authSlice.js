import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("fullname");
const initialFullname = name ? JSON.parse(name) : "";


const initialState = {
  isLoggedIn: false,
  fullname: initialFullname,
  user: {
     id: "",
    email: "",
    photo: ""
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
      localStorage.setItem("fullname", JSON.stringify(action.payload));
      state.fullname = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;   
      state.user.email = profile.email;
      state.user.id= profile._id;
      state.user.photo=profile.photo
    
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.fullname;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;