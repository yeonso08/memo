import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  memos: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTitle = createAsyncThunk(
  'getTitle',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/memos');
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addTitle = createAsyncThunk(
  'addTitle',
  async (payload, thunkAPI) => {
    const res = await axios.post('http://localhost:3001/memos', payload);

    return thunkAPI.fulfillWithValue(res.data);
  }
);

export const __updateTitle = createAsyncThunk(
    'updateTitle',
    async (payload, thunkAPI) => {
        const { id, title } = payload;
        const res = await axios.put(`http://localhost:3001/memos/${id}`, { title });
      return thunkAPI.fulfillWithValue(res.data);
    }
  );

const memosSlice = createSlice({
  name: 'memos',
  initialState,
  reducers: {
  },

  extraReducers: {
    [__getTitle.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.memos = action.payload;
    },
    [__getTitle.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getTitle.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__addTitle.fulfilled]: (state, action) => {
      state.memos.push(action.payload);
    },
    [__updateTitle.fulfilled]: (state, action) => {
        const { id, title } = action.payload;
        const memoIndex = state.memos.findIndex((memo) => memo.id === id);
        state.memos[memoIndex].title = title;
      },
  },
});

export default memosSlice.reducer;
export const { addTitle, getTitle, updateTitle } = memosSlice.actions;