import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, NodeChange, EdgeChange, Connection } from 'react-flow-renderer';
import { Step } from '../../redux/Step/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { addEdgeAsync, connect, setEdges, setNodes, updateEdges, updateNodes } from '../../redux/Diagram';
import CustomNode from '../CustomNode';

const nodeTypes = { customNode: CustomNode };
interface Props {
  diagramNodes: any;
  diagramEdges?: any;
  children?: any;
  onClick?: (step: Step) => void;
}
const DiagramFlow = ({ diagramNodes, diagramEdges = [], children, onClick }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const nodes = useSelector((state: RootState) => state.Diagram.nodes);
  const edges = useSelector((state: RootState) => state.Diagram.edges);

  useEffect(() => {
    dispatch(setNodes(diagramNodes));
    dispatch(setEdges(diagramEdges));
  }, [diagramNodes.length, diagramEdges.length]);

  const onNodeClick = useCallback((event: any, node: any) => {
    onClick?.(node);
  }, []);

  const handlePaneClick = useCallback((event: any) => {}, [nodes, setNodes]);

  const onNodesChange = (changes: NodeChange[]) => {
    dispatch(updateNodes(changes));
    // dispatch(saveFlowData());
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    dispatch(updateEdges(changes));
    // dispatch(saveFlowData());
  };

  const onConnect = (connection: Connection) => {
    dispatch(addEdgeAsync(connection));

    // dispatch(saveFlowData());
  };

  return (
    <div style={{ height: 400 }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          type: 'customNode',
        }))}
        edges={edges}
        onNodeClick={onNodeClick}
        onPaneClick={handlePaneClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
      {children}
    </div>
  );
};

export default DiagramFlow;
