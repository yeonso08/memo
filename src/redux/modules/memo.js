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
        },
            
            updateTitle: async (state, action) => {
                try {
                  const { id, title } = action.payload;
                  // 서버에 업데이트 요청을 보냅니다.
                  await axios.put(`http://localhost:3001/memos/${id}`, { title });
                  // state에서 해당 메모를 찾아 제목을 업데이트합니다.
                  const memoIndex = state.memos.findIndex((memo) => memo.id === id);
                  state.memos[memoIndex].title = title;
                  state.isError = false;
                  state.error = null;
                } catch (error) {
                  state.isError = true;
                  state.error = error;
                }
              },
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
export const {addTitle, getTitle, updateTitle} = memosSlice.actions