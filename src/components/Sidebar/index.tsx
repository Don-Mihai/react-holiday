import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';
import './style.scss';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

interface Props {
  handleSave?: () => void;
  classNames?: string[];
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Sidebar = ({ classNames, open, handleClose, handleSave, children }: Props) => {
  const [openUrl, setOpenUrl] = useState(false);
  const handleUploadIconClick = () => {
    setOpenUrl(true);
  };

  return (
    <Drawer anchor={'right'} className="component-sidebar" open={open} onClose={handleClose}>
      <div className="component-sidebar__container">
        {children}
        <Button onClick={handleUploadIconClick} variant="contained" component="label" startIcon={<ImageUploadIcon />} style={{ marginBottom: '20px' }}>
          Загрузить иконку
        </Button>
        {openUrl ? <TextField label="Путь к иконке" variant="outlined" /> : ''}

        <div className="component-sidebar__bottom-buttons">
          <Button variant="contained" component="label" onClick={handleSave}>
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
