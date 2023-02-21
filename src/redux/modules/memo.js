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
    // async (payload, thunkAPI) => {
    //     try{
    //         const response = await axios.get("http://localhost:3001/memos")
    //         thunkAPI.fulfillWithValue(response.data);
    //     } catch (error) {
    //         return thunkAPI.rejectWithValue(error);
    //     }
        
    // }
    async () => {
        try {
            const response = await axios.get("http://localhost:3001/memos");
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

const memosSlice = createSlice({
    name: "memos",
    initialState,
    reducers: {
        // addTitle: async (state, action) => {
        //     await axios.post("http://localhost:3001/memos", action.payload);
        //     state.memos = action.payload
        //     return __getTitle()
        // },
        addTitle: async (state, action) => {
            try {
                // 새로운 메모를 생성합니다.
                const response = await axios.post("http://localhost:3001/memos", action.payload);
                const newMemo = response.data;
                
                // state에 새로운 메모를 추가합니다.
                state.memos.push(newMemo);
                state.isError = false;
                state.error = null;
            } catch (error) {
                state.isError = true;
                state.error = error;
            }
        }
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