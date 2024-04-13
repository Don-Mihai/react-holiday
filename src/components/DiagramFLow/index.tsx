import React, { useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, Position, Handle, addEdge } from 'react-flow-renderer';
import { Tooltip } from '@mui/material';

const nodeTypes = {
  special: ({ data }: any) => (
    <Tooltip title={data.label} placement="right">
      <div>
        <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
        <img src={data.icon} alt="" style={{ width: 50, height: 50 }} />

        <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
      </div>
    </Tooltip>
  ),
};

const TreeComponent = () => {
  // Инициализация локального состояния узлов и рёбер. Если нужно, здесь можно загрузить начальное состояние.
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const toggleNodeStatus = useCallback(
    (nodeId: any) => {
      console.log(nodeId);
      setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, completed: !node.data.completed } } : node)));
    },
    [setNodes]
  );

  const onNodeClick = useCallback(
    (event: any, node: any) => {
      toggleNodeStatus(node.id);
    },
    [toggleNodeStatus]
  );

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

  return (
    <div style={{ height: 800 }}>
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
        // fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default TreeComponent;
