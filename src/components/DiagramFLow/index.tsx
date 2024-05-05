import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, Position, Handle, addEdge } from 'react-flow-renderer';
import { Button, Drawer, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Sidebar from '../Sidebar';
import { Step } from '../../redux/Step/types';

const nodeTypes = {
  special: ({ data }: any) => (
    <Tooltip title={data.title} placement="right">
      <div>
        <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
        <img src={data.icon} alt="" style={{ width: 50, height: 50 }} />

        <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
      </div>
    </Tooltip>
  ),
};
interface Props {
  diagramNodes: any;
  diagramEdges?: any;
  children?: any;
  onClick?: (step: Step) => void;
}
const DiagramFlow = ({ diagramNodes, diagramEdges, children, onClick }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentNode, setCurrentNode] = React.useState<any>({});

  useEffect(() => {
    setNodes(diagramNodes);
    setEdges(diagramEdges);
  }, [diagramNodes, diagramEdges]);

  const onNodeClick = useCallback((event: any, node: any) => {
    setCurrentNode(node);
    onClick?.(node);
  }, []);

  const handlePaneClick = useCallback(
    (event: any) => {
      const reactFlowBounds = event.target.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };
      const newNode = {
        id: `node_${Math.random()}`,
        data: { label: `Узел ${nodes.length + 1}`, icon: '/cat.png', completed: false },
        position,
        sourcePosition: Position.Right,
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const closeAside = () => {
    setCurrentNode({});
  };

  const handleChange = (field: string, newValue: any) => {
    setCurrentNode((prevNode: any) => ({
      ...prevNode,
      data: {
        ...prevNode.data,
        [field]: newValue,
      },
    }));

    // Обновить состояние nodes, чтобы отразить изменения в currentNode
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === currentNode.id) {
          return { ...node, data: { ...node.data, [field]: newValue } };
        }
        return node;
      })
    );
  };

  return (
    <div style={{ height: 400 }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          type: 'special',
          style: { border: '1px solid #777', padding: 10, backgroundColor: node.data.completed ? '#A2D2FF' : '#D3D3D3' },
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
