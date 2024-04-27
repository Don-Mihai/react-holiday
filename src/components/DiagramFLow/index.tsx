import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, Position, Handle, addEdge } from 'react-flow-renderer';
import { Button, Drawer, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentNode, setCurrentNode] = React.useState<any>({});

  const { nodes: diagramNodes, edges: diagramEdges } = useSelector((state: RootState) => state.Diagram);

  useEffect(() => {
    setNodes(diagramNodes);
    setEdges(diagramEdges);
  }, [diagramNodes, diagramEdges]);

  const onNodeClick = useCallback((event: any, node: any) => {
    console.log(node);
    setCurrentNode(node);
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

  const handleStatusChange = (event: any, newStatus: any) => {
    setCurrentNode((prevNode: any) => ({
      ...prevNode,
      data: {
        ...prevNode.data,
        completed: newStatus,
      },
    }));

    // Обновить состояние nodes, чтобы отразить изменения в currentNode
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === currentNode.id) {
          return { ...node, completed: newStatus };
        }
        return node;
      })
    );
  };

  const handleDescriptionChange = (event: any) => {
    const { value } = event.target;
    setCurrentNode((prevNode: any) => ({
      ...prevNode,
      description: value,
    }));

    // Обновить состояние nodes, чтобы отразить изменения в currentNode
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === currentNode.id) {
          return { ...node, description: value };
        }
        return node;
      })
    );
  };

  console.log(currentNode);

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
      <Drawer anchor={'right'} open={currentNode.id} onClose={closeAside}>
        <div className="sidebar__container" style={{ width: '400px', padding: '20px' }}>
          <ToggleButtonGroup
            color="primary"
            value={currentNode?.data?.completed}
            exclusive
            onChange={handleStatusChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          >
            <ToggleButton value={false}>Незавершенная</ToggleButton>
            <ToggleButton value={true} color="success">
              Завершенная
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Описание задачи"
            multiline
            rows={4}
            value={currentNode.description}
            onChange={handleDescriptionChange}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px' }}
          />

          <Button variant="contained" component="label" startIcon={<ImageUploadIcon />} style={{ marginBottom: '20px' }}>
            Загрузить иконку
          </Button>

          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} style={{ marginTop: '20px' }}>
            Удалить задачу
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default TreeComponent;
