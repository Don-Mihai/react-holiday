import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useState } from 'react';
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

interface Step {
  id: string;
  title: string;
  description: string;
  imgUrl?: string;
}

interface Props {
  step: Step;
  onDelete: (id: string) => void;
}

const Step = ({ step, onDelete }: Props) => {
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

  return (
    <div className="step">
      <Avatar alt="Step" src={step.imgUrl} />
      <h3 className="step__title">{step.title}</h3>
      <p className="step__description">{step.description}</p>
      <div className="step__actions">
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Step;
