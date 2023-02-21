import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    memos: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const __getTitle = createAsyncThunk(
    "getTitle",
    async (payload, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/memos")
            thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
        
    }
);

const memosSlice = createSlice({
    name: "memos",
    initialState,
    reducers: {
        addTitle: async (state, action) => {
            axios.post("http://localhost:3001/memos", action.payload);
            state.memos = action.payload
        },

        // deleteTitle: async (state, action) => {
        //     axios.delete("http://localhost:3001/memos", action.payload);
        //     state.memos = 
        // },
    },
    extraReducers: {
        [__getTitle.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.memos = action.payload
        },
        [__getTitle.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getTitle.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload
        }
    },
});

export default memosSlice.reducer;
export const {addTitle, getTitle} = memosSlice.actions