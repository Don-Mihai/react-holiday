import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils';
import axios from 'axios';
import { User } from './type';

const initialState: any = {
  user: {},
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const getUserById = createAsyncThunk('user/getUserById', async (userId?: any): Promise<User> => {
  const response = await axios.get(`${BASE_URL}users/${userId || localStorage.getItem('userId')}`);
  return response.data;
});
