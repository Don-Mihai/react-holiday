import { Connection } from 'react-flow-renderer';
import { Step } from '../Step/types';

export interface Edge extends Connection {
  id: string;
  parentId: string;
}

export interface InitialState {
  nodes: any[];
  edges: any[];
}
