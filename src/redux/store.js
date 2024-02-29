import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice"
//import cattleReducer from "./features/cattle/cattleSlice";


export const store = configureStore({
     reducer: {
           auth: authReducer,
          // cattle: cattleReducer
     } 
})