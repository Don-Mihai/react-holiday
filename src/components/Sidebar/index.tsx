import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';
import './style.scss';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

interface Props {
  handleSave?: (innerValues: any) => void;
  classNames?: string[];
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Sidebar = ({ classNames, open, handleClose, handleSave, children }: Props) => {
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

  return (
    <Drawer anchor={'right'} className="component-sidebar" open={open} onClose={onClose}>
      <div className="component-sidebar__container">
        {children}
        <Button onClick={handleUploadIconClick} variant="contained" component="label" startIcon={<ImageUploadIcon />} style={{ marginBottom: '20px' }}>
          Загрузить иконку
        </Button>
        {openUrl ? <TextField onChange={handleChange} name="imgUrl" value={formValues?.imgUrl} label="Путь к иконке" variant="outlined" /> : ''}

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
