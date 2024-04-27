import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitialState, PStepPost, Step } from './types';
import { BASE_URL } from '../../utils';
import axios from 'axios';

const initialState: InitialState = {
  steps: [],
  isLoading: false,
};

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get.fulfilled, (state, action) => {
        state.steps = action.payload;
        state.isLoading = false;
      })
      .addCase(get.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(post.fulfilled, (state, action) => {
        state.steps.push(action.payload);
      })
      .addCase(remove.fulfilled, (state, action) => {
        const newArr = state.steps.filter((s) => {
          return s.id != action.payload.id;
        });
        state.steps = newArr;
      })
      .addCase(update.fulfilled, (state, action) => {
        const updatedStep = action.payload;
        const index = state.steps.findIndex((s) => s.id === updatedStep.id);
        if (index !== -1) {
          state.steps[index] = updatedStep;
        }
      });
  },
});

export const {} = stepSlice.actions;

export default stepSlice.reducer;

export const get = createAsyncThunk('step/get', async (processId: string | undefined): Promise<Step[]> => {
  const steps = processId ? (await axios.get(BASE_URL + `steps?processId=${processId}`)).data : [];

  return steps;
});

export const post = createAsyncThunk('step/post', async (payload: PStepPost): Promise<Step> => {
  const step = (await axios.post(BASE_URL + 'steps', payload)).data;

  return step;
});

export const remove = createAsyncThunk('step/delete', async (id: string): Promise<Step> => {
  const step = (await axios.delete(BASE_URL + 'steps/' + id)).data;
  return step;
});

export const update = createAsyncThunk('step/update', async (updatedStep: Step): Promise<Step> => {
  const response = await axios.put(BASE_URL + 'steps/' + updatedStep.id, updatedStep);
  return response.data;
});
