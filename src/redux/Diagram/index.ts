// diagramSlice.js
//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  nodes: [
    { key: 1, text: 'cute.png', color: 'lightyellow', loc: '0 0' },
    { key: 2, text: 'cat.png', color: 'brown', loc: '200 0' },
    { key: 3, text: 'cat.png', color: 'green', loc: '300 100' },
    { key: 4, text: 'cat.png', color: 'slateblue', loc: '100 200' },
    { key: 5, text: 'cat.png', color: 'aquamarine', loc: '300 350' },
    { key: 6, text: 'cat.png', color: 'tomato', loc: '0 100' },
    { key: 7, text: 'love.png', color: 'goldenrod', loc: '0 300' },
    {
      key: 8,
      text: 'smile.png',
      color: 'orange',
      loc: '300 200',
    },
  ],
  links: [
    { from: 1, to: 2, path: [2, 3, 4], color: 'blue' },
    { from: 2, to: 3, path: [7, 4, 8], color: 'red' },
    { from: 3, to: 4, path: [7, 4, 8], color: 'red' },
    { from: 3, to: 8, path: [7, 4, 8], color: 'red' },
    { from: 6, to: 5, path: [7, 4, 8], color: 'red' },
  ],
};

export const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    addLink: (state, action) => {
      state.links.push(action.payload);
    },
    initializeDiagram: (state, action) => {
      state.nodes = action.payload.nodes;
      state.links = action.payload.links;
    },
  },
});

export const { addNode, addLink, initializeDiagram } = diagramSlice.actions;

export default diagramSlice.reducer;
