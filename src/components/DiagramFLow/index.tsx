import React, { useCallback, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, Position, Handle, addEdge } from 'react-flow-renderer';
import { Button, Drawer, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [taskStatus, setTaskStatus] = React.useState('incomplete');
  const [description, setDescription] = React.useState('');

  const handleStatusChange = (event: any, newStatus: any) => {
    if (newStatus !== null) {
      setTaskStatus(newStatus);
    }
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleUploadClick = () => {
    // Trigger file input click or handle file upload
  };

  const toggleNodeStatus = useCallback(
    (nodeId: any) => {
      console.log(nodeId);
      setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, completed: !node.data.completed } } : node)));
    },
    [setNodes]
  );

  const onNodeClick = useCallback(
    (event: any, node: any) => {
      setIsDrawerOpen(true);
    },
    [setIsDrawerOpen]
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

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
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
        // fitView
      >
        {/* <MiniMap /> */}
        {/* <Controls /> */}
        <Background />
      </ReactFlow>
      <Drawer anchor={'right'} open={isDrawerOpen} onClose={toggleDrawer}>
        <div className="sidebar__container" style={{ width: '400px', padding: '20px' }}>
          <ToggleButtonGroup color="primary" value={taskStatus} exclusive onChange={handleStatusChange} fullWidth style={{ marginBottom: '20px' }}>
            <ToggleButton value="incomplete">Незавершенная</ToggleButton>
            <ToggleButton value="complete" color="success">
              Завершенная
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Описание задачи"
            multiline
            rows={4}
            value={description}
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
