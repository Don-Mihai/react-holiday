import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, Position, addEdge } from 'react-flow-renderer';
import { Step, StepData } from '../../redux/Step/types';
import { Tooltip } from '@mui/material';
import './style.scss';
import cls from 'classnames';

interface Props {
  data: StepData;
}
const CustomNode = ({ data }: Props) => {
  return (
    <Tooltip title={data.title} placement="right">
      <div className="container">
        <img className={cls('node__img', { uncompleted: !data.completed })} src={data.imgUrl} alt="" />
      </div>
    </Tooltip>
  );
};

export default CustomNode;
