// diagramSlice.js
//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  nodes: [
    { id: '1', type: 'input', data: { label: 'Узел 1', icon: '/cat.png', completed: false }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Узел 2', icon: '/cat.png', completed: false }, position: { x: 100, y: 100 } },
    // Добавьте здесь больше узлов по необходимости
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    // Добавьте здесь больше рёбер по необходимости
  ],
};

export const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    toggleNodeStatus: (state, action) => {
      const node = state.nodes.find((node) => node.id === action.payload);
      if (node) {
        node.data = {
          ...node.data,
          completed: !node.data.completed,
        };
      }
    },
    updateNodes(state, action: PayloadAction<any[]>) {
      // Простое обновление, например, для изменения положения узлов
      action.payload.forEach((update) => {
        const node = state.nodes.find((n) => n.id === update.id);
        if (node) {
          // В этом примере обновляем только положение узла, но вы можете расширить логику по необходимости
          node.position = update.position;
        }
      });
    },
    // Обновление рёбер
    updateEdges(state, action: PayloadAction<any[]>) {
      // Пример обновления может включать добавление нового ребра или удаление существующего
      // Здесь приведен пример добавления ребра
      state.edges = [...state.edges, ...action.payload];
    },
    // Добавьте другие редьюсеры по мере необходимости
  },
});

export const { addNode, addEdge, toggleNodeStatus, updateEdges, updateNodes } = diagramSlice.actions;

export default diagramSlice.reducer;
