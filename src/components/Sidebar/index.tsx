import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageUploadIcon from '@mui/icons-material/CloudUpload';
import './style.scss';

interface Props {
  classNames?: string[];
  open: boolean;
  handleClose: () => void;
  completed: boolean;
  onChange: (field: string, newValue: any) => void;
  description: string;
}

const Sidebar = ({ classNames, open, handleClose, completed, onChange, description }: Props) => {
  return (
    <Drawer anchor={'right'} className="component-sidebar" open={open} onClose={handleClose}>
      <div className="component-sidebar__container">
        <ToggleButtonGroup
          color="primary"
          value={completed}
          exclusive
          onChange={(e: any) => onChange('completed', e)}
          fullWidth
          style={{ marginBottom: '20px' }}
        >
          <ToggleButton value={false}>Незавершенная</ToggleButton>
          <ToggleButton value={true} color="success">
            Завершенная
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label="Описание"
          multiline
          rows={4}
          value={description}
          onChange={(e: any) => onChange('description', e)}
          variant="outlined"
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <Button variant="contained" component="label" startIcon={<ImageUploadIcon />} style={{ marginBottom: '20px' }}>
          Загрузить иконку
        </Button>

        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} style={{ marginTop: '20px' }}>
          Удалить задачу
        </Button>
      </div>
    </Drawer>
  );
};

export default Sidebar;
