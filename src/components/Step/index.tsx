import React, { memo, useCallback, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Avatar, Button, Drawer, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrag, useDrop } from 'react-dnd';

import './style.scss';
import { Step as IStep } from '../../redux/Step/types';

interface Props {
  step: IStep;
  index: number;
  onDelete: (id: string) => void;
  onClick: (step: IStep) => void;
  moveStep: (dragIndex: number, hoverIndex: number) => void;
}

const Step = ({ step, index, onDelete, onClick, moveStep }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'STEP',
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveStep(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'STEP',
    item: { type: 'STEP', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleDelete = (event: any) => {
    event.stopPropagation();
    onDelete(step.id);
  };

  const handleDeleteChanges = (event: any) => {
    event.stopPropagation();
    onDelete(step.id);
  };

  const handleClick = (e: any) => {
    onClick(step);
  };

  return (
    <div className="step" onClick={handleClick} ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Avatar alt="Step" src={step.data.imgUrl} />
      <h3 className="step__title">{step.data.title}</h3>
      <p className="step__description">{step.data.description}</p>
      <div className="step__actions">
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default memo(Step);
