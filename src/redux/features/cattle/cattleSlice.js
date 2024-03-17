import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cattleService from './cattleService';
import { toast } from 'react-toastify';

const initialState = {
    cattle: null,
    cattles: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: false,
};

export const createNewCattle = createAsyncThunk(
    "cattle/create",
    async (formData, thunkAPI) => {
        try {
            return await cattleService.createCattle(formData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCattle = createAsyncThunk(
    "cattle/updateCattle",
    async (formData, thunkAPI) => {
        try {
            return await cattleService.updateCattles(formData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const cattleSlice = createSlice({
    name: "cattles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewCattle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewCattle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log(action.payload);
                toast.success("Cattle added Successfully");
            })
            .addCase(createNewCattle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateCattle.pending, (state) => {
                state.isLoading = true;
                console.log("cattle pending");
            })
            .addCase(updateCattle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log("cattle detail updated successfully");
                setTimeout(() => { // Introduce a delay before displaying the toast
                    toast.success("Cattles updated successfully");
                }, 500); // Adjust the delay time as needed
            })
            .addCase(updateCattle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                console.log("cattle detail rejected");
                toast.error(action.payload);
            });
    },
});

export const selectIsLoading = (state) => state.cattle.isLoading;
export const allcattles = (state) => state.cattle.cattles;

export default cattleSlice.reducer;
