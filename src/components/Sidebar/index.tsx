import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';
import './style.scss';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FileDrop from '../FileDrop';
import axios from 'axios';
import { BASE_URL, SERVER_URL } from '../../utils';

interface Props {
  handleSave?: (innerValues: any) => void;
  classNames?: string[];
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  data?: any;
}

const Sidebar = ({ classNames, data, open, handleClose, handleSave, children }: Props) => {
  const [openUrl, setOpenUrl] = useState(false);
  const [formValues, setFormValues] = useState<any>({});

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleUploadIconClick = () => {
    setOpenUrl(true);
  };

  const onSave = () => {
    handleSave?.(formValues);
  };

  const onClose = () => {
    handleClose();
    setFormValues({});
    setOpenUrl(false);
  };

  const saveImg = (file: Blob) => {
    const formData = new FormData();
    formData.append('filedata', file);
    formData.append('id', data?.id);

    axios
      .post(SERVER_URL + 'step/upload-icon', formData)
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(SERVER_URL + 'step/generate-icon', { description: data?.data.description });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated_image.png');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  console.log(formValues, data);

  return (
    <Drawer anchor={'right'} className="component-sidebar" open={open} onClose={onClose}>
      <div className="component-sidebar__container">
        {children}
        <FileDrop borderRadius="4px" onSendFiles={saveImg} fullWidth>
          <Button onClick={handleUploadIconClick} sx={{ height: '80px' }} fullWidth variant="contained" component="label" startIcon={<ImageUploadIcon />}>
            Загрузить иконку
          </Button>
        </FileDrop>

        <Button onClick={handleGenerateImage} fullWidth variant="outlined" component="label" startIcon={<ImageUploadIcon />}>
          {loading ? 'Генерация...' : 'Сгенерировать иконку'}
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="component-sidebar__bottom-buttons">
          <Button variant="contained" component="label" onClick={onSave}>
            Сохранить
          </Button>

          <Button variant="outlined">Отменить</Button>

          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Удалить
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
