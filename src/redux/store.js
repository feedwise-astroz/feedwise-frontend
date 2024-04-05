import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice"
//import cattleReducer from "./features/cattle/cattleSlice";
import feedReducer from "../redux/features/inventory/inventorySlice"


export const store = configureStore({
     reducer: {
           auth: authReducer,
           feed: feedReducer,
           
     } 
})