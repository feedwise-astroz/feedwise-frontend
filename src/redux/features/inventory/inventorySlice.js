import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import inventoryService from "./inventoryService";
import { toast } from "react-toastify";
//import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';



const initialState = {
    feed: null,
    feeds: [], 
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    totalStoreValue: 0,
    outOfStock: 0,
    category: [],
};

// Create New Product
export const createNewFeed = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
     console.log(formData)
      return await inventoryService.createFeed(formData);

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getFeeds = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
      try {
        return await inventoryService.getFeeds();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // Get a product
export const getFeed = createAsyncThunk(
  "feeds/getFeed",
  async (id, thunkAPI) => {
    try {
      return await inventoryService.getFeed(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);



const inventorySlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
    },
    extraReducers: (builder) =>{
        builder
      .addCase(createNewFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.feeds.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(createNewFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.feeds = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.feed= action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
  
    },
  });
  
  
  export const selectIsLoading = (state) => state.feed.isLoading;

  export default inventorySlice.reducer