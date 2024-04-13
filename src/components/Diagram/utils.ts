import * as go from 'gojs';

export function createDiagram(diagramRef: any, nodes: any, links: any) {
  const $ = go.GraphObject.make;
  const myDiagram = $(go.Diagram, diagramRef, {
    'undoManager.isEnabled': true,
  });

  myDiagram.nodeTemplate = $(
    go.Node,
    go.Panel.Auto,
    { locationSpot: go.Spot.Center },
    new go.Binding('location', 'loc', go.Point.parse),
    $(go.Shape, { figure: 'Circle', fill: 'white' }, new go.Binding('fill', 'color')),
    $(go.Picture, { width: 34, height: 34, source: 'cat.png' })
  );

  myDiagram.linkTemplate = $(
    go.Link, // subclass of Link, defined below
    go.Link.Bezier,
    { layerName: 'Background', toShortLength: 4 },
    $(go.Shape, { strokeWidth: 4 }, new go.Binding('stroke', 'color')),
    $(go.Shape, { toArrow: 'Standard', scale: 3, strokeWidth: 0 }, new go.Binding('fill', 'color'))
  );

  // Создаем копии данных, чтобы они были "расширяемы"
  const nodesCopy = JSON.parse(JSON.stringify(nodes));
  const linksCopy = JSON.parse(JSON.stringify(links));

  myDiagram.model = new go.GraphLinksModel(nodesCopy, linksCopy);
}
