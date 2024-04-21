import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialState, PProcessPost, Process } from './types';
import { BASE_URL } from '../../utils';
import axios from 'axios';

const initialState: InitialState = {
  processes: [],
  isLoading: false,
};

export const processSlice = createSlice({
  name: 'process',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get.fulfilled, (state, action) => {
        state.processes = action.payload;
        state.isLoading = false;
      })
      .addCase(get.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(post.fulfilled, (state, action) => {
        state.processes.push(action.payload);
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.processes.filter((p) => {
          return p.id != action.payload.id;
        });
      });
  },
});

export const {} = processSlice.actions;

export default processSlice.reducer;

export const get = createAsyncThunk('process/get', async (): Promise<Process[]> => {
  const process = (await axios.get(BASE_URL + 'processes')).data;

  return process;
});

export const post = createAsyncThunk('process/post', async (payload: PProcessPost): Promise<Process> => {
  const process = (await axios.post(BASE_URL + 'processes', payload)).data;

  return process;
});

export const remove = createAsyncThunk('process/delete', async (id: string): Promise<Process> => {
  const process = (await axios.delete(BASE_URL + 'processes/' + id)).data;
  return process;
});
