import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'react-flow-renderer';
import { RootState } from '../store';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Edge, InitialState } from './types';

const initialState: InitialState = {
  nodes: [],
  edges: [],
};

export const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    updateNodes: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    updateEdges: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    connect: (state, action) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEdgeAsync.fulfilled, (state, action) => {
        state.edges = addEdge(action.payload, state.edges);
      })
      .addCase(getEdges.fulfilled, (state, action) => {
        state.edges = action.payload;
      });
  },
});

export const { updateNodes, updateEdges, connect, setNodes, setEdges } = diagramSlice.actions;

export default diagramSlice.reducer;

export const addEdgeAsync = createAsyncThunk('diagram/addEdge', async (payload: any, thunkAPI) => {
  const edge = (await axios.post(BASE_URL + 'edges', payload)).data;
  return edge;
});

export const getEdges = createAsyncThunk('diagram/get', async (parentId: string | undefined): Promise<Edge[]> => {
  const edges = parentId ? (await axios.get(BASE_URL + `edges?parentId=${parentId}`)).data : [];

  return edges;
});
