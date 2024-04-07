import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { RootState } from '../../redux/store';
import { createDiagram } from './utils';

const DiagramComponent = () => {
  const { nodes, links } = useSelector((state: RootState) => state.Diagram);
  const diagramRef = useRef<any>(null);

  useEffect(() => {
    createDiagram(diagramRef.current, nodes, links);
  }, [nodes, links]);

  return (
    <div ref={diagramRef} id="myDiagramDiv" style={{ width: '100%', height: '500px', border: '1px solid black' }}>
      <canvas tabIndex={0} width="1487" height="872"></canvas>
    </div>
  );
};

export default DiagramComponent;
