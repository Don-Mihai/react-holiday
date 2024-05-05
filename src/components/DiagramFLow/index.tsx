import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, Position, addEdge } from 'react-flow-renderer';
import { Step } from '../../redux/Step/types';
// import { CostumNode } from './CostumNode';

// const nodeTypes = { costumNode: CostumNode };
interface Props {
  diagramNodes: any;
  diagramEdges?: any;
  children?: any;
  onClick?: (step: Step) => void;
}
const DiagramFlow = ({ diagramNodes, diagramEdges, children, onClick }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentNode, setCurrentNode] = useState<any>({});

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
          // поменять ключ
          type: 'costumNode',
        }))}
        edges={edges}
        onNodeClick={onNodeClick}
        onPaneClick={handlePaneClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // nodeTypes={nodeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
      {children}
    </div>
  );
};

export default DiagramFlow;
