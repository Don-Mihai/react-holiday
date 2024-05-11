import { createSlice } from '@reduxjs/toolkit';
import { Connection, Edge, EdgeChange, Node, NodeChange, addEdge, applyNodeChanges, applyEdgeChanges } from 'react-flow-renderer';

const initialState = {
  nodes: [
    { id: '1', type: 'input', data: { label: 'HTML', icon: '/cat.png', completed: false }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'CSS', icon: '/cat.png', completed: false }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'JavaScript', icon: '/cat.png', completed: false }, position: { x: 150, y: 200 } },
    { id: '4', data: { label: 'React', icon: '/cat.png', completed: false }, position: { x: 200, y: 300 } },
    { id: '5', data: { label: 'Angular', icon: '/cat.png', completed: false }, position: { x: 250, y: 400 } },
    { id: '6', data: { label: 'Vue.js', icon: '/cat.png', completed: false }, position: { x: 300, y: 500 } },
    { id: '7', data: { label: 'Bootstrap', icon: '/cat.png', completed: false }, position: { x: 350, y: 600 } },
    { id: '8', data: { label: 'Responsive Design', icon: '/cat.png', completed: false }, position: { x: 400, y: 700 } },
    { id: '9', data: { label: 'Version Control (Git)', icon: '/cat.png', completed: false }, position: { x: 450, y: 800 } },
    { id: '10', data: { label: 'Testing and Debugging', icon: '/cat.png', completed: false }, position: { x: 500, y: 900 } },
    { id: '11', data: { label: 'Browser Developer Tools', icon: '/cat.png', completed: false }, position: { x: 550, y: 1000 } },
    { id: '12', data: { label: 'Web Performance Optimization', icon: '/cat.png', completed: false }, position: { x: 600, y: 1100 } },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e3-5', source: '3', target: '5' },
    { id: 'e3-6', source: '3', target: '6' },
    { id: 'e4-7', source: '4', target: '7' },
    { id: 'e5-7', source: '5', target: '7' },
    { id: 'e6-7', source: '6', target: '7' },
    { id: 'e7-8', source: '7', target: '8' },
    { id: 'e8-9', source: '8', target: '9' },
    { id: 'e9-10', source: '9', target: '10' },
    { id: 'e10-11', source: '10', target: '11' },
    { id: 'e11-12', source: '11', target: '12' },
  ],
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
});

export const { updateNodes, updateEdges, connect, setNodes, setEdges } = diagramSlice.actions;

export default diagramSlice.reducer;
