import { useDispatch, useSelector } from 'react-redux';
import React, { memo, useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Avatar, Button, Drawer, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';

import './style.scss';
import { useNavigate } from 'react-router-dom';
import { update } from '../../redux/Process';
import { AppDispatch } from '../../redux/store';
import { post } from '../../redux/Step';
import { PStepPost } from '../../redux/Step/types';
import { Step as IStep } from '../../redux/Step/types';

interface Props {
  step: IStep;
  onDelete: (id: string) => void;
  onClick: (step: IStep) => void;
}

const Step = ({ step, onDelete, onClick }: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

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
    <div className="step" onClick={handleClick}>
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
