import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Button, Drawer, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';

import './style.scss';
import { useNavigate } from 'react-router-dom';
import { update } from '../../redux/Process';
import { AppDispatch } from '../../redux/store';
import { post } from '../../redux/Step';
import { PStepPost } from '../../redux/Step/types';

interface Process {
  id: string;
  title: string;
  description: string;
}

interface Props {
  process: Process;
  onDelete: (id: string) => void;
}

const Process = ({ process, onDelete }: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(process.title);
  const [editedDescription, setEditedDescription] = useState(process.description);

  const handleTitleChange = (event: any) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setEditedDescription(event.target.value);
  };

  const handleSaveChanges = async () => {
    const updatedProcess = { ...process, title: editedTitle, description: editedDescription };
    await dispatch(update(updatedProcess));
    closeSidebar();
  };

  const handleDelete = (event: any) => {
    event.stopPropagation();
    onDelete(process.id);
  };

  const handleDeleteChanges = (event: any) => {
    event.stopPropagation();
    onDelete(process.id);
    closeSidebar();
  };

  const closeSidebar = () => {
    setIsDrawerOpen(false);
  };

  const onNodeClick = (event: any) => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="process" onClick={() => navigate(`/processes/${process.id}`)}>
      <h3 className="process__title">{process.title}</h3>
      <p className="process__description">{process.description}</p>
      <div className="process__actions">
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>

      <Drawer anchor={'right'} open={isDrawerOpen} onClose={closeSidebar}>
        <div className="sidebar__container" style={{ width: '400px', padding: '20px' }}>
          <TextField
            label={'Название задачи'}
            multiline
            rows={4}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label={'Описание задачи'}
            multiline
            rows={4}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px' }}
          />

          <Button variant="contained" onClick={handleSaveChanges} component="label" startIcon={<ImageUploadIcon />} style={{ marginBottom: '20px' }}>
            Сохранить изменения
          </Button>

          <Button variant="outlined" onClick={handleDeleteChanges} color="error" startIcon={<DeleteIcon />} style={{ marginTop: '20px' }}>
            Удалить задачу
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Process;
