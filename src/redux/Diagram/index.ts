// diagramSlice.js
//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  nodes: [
    { key: 1, text: 'HTML', color: 'lightyellow', loc: '0 0' },
    { key: 2, text: 'CSS', color: 'brown', loc: '200 0' },
    { key: 3, text: 'JavaScript', color: 'green', loc: '400 0' },
    { key: 4, text: 'Responsive Design', color: 'slateblue', loc: '600 0' },
    { key: 5, text: 'Version Control/Git', color: 'aquamarine', loc: '0 200' },
    { key: 6, text: 'React', color: 'tomato', loc: '200 200' },
    { key: 7, text: 'State Management (e.g., Redux)', color: 'goldenrod', loc: '400 200' },
    { key: 8, text: 'Testing (e.g., Jest)', color: 'orange', loc: '600 200' },
    { key: 9, text: 'Build Tools (e.g., Webpack)', color: 'pink', loc: '200 400' },
    { key: 10, text: 'Accessibility', color: 'lightblue', loc: '400 400' },
  ],
  links: [
    { from: 1, to: 2, color: 'blue' },
    { from: 2, to: 3, color: 'blue' },
    { from: 3, to: 4, color: 'blue' },
    { from: 1, to: 5, color: 'red' },
    { from: 3, to: 6, color: 'red' },
    { from: 6, to: 7, color: 'red' },
    { from: 3, to: 8, color: 'red' },
    { from: 2, to: 9, color: 'green' },
    { from: 2, to: 10, color: 'green' },
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
