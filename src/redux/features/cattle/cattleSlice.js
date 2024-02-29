import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import cattleService, { createCattle } from './cattleService';
import { toast } from 'react-toastify';

const initialState = {

    cattle: null,
    cattles: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: false,

}

// Create New Cattle
export const createNewCattle = createAsyncThunk(
    "cattles/create",
    async (formData, thunkAPI) =>{
        try{
            return await cattleService.createCattle(formData)

        }catch(error){
        //    console.log(error.response.data.error);
         const message= (error.response.data.error);
         return thunkAPI.rejectWithValue(message)
         
        }
    }
)

const cattleSlice = createSlice({
  name: "cattle",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action){
        console.log("store value")
    }
  },
  extraReducers: (builder) =>{
    builder.addCase(createCattle.pending, (state) =>{
        state.isLoading = true
    })
    .addCase(createCattle.fulfilled, (state, action)=> {
        state.isLoading = false;
        state.isSuccess= true;
        console.log(action.payLoad)
        state.cattles.push(action.payLoad);
        toast.success("Cattle added Successfully")
    })
    .addCase(createCattle.rejected, (state, action)=> {
        state.isLoading = false;
        state.isError= true;
         state.message = action.payLoad;
        toast.success(action.payLoad)
    })

  },
});

export const {CALC_STORE_VALUE} = cattleSlice.actions
export const selectIsLoading = (state) => state.product.isLoading;

export default cattleSlice.reducer