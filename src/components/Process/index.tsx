import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './style.scss';

interface Process {
  id: number;
  title: string;
  description: string;
}

interface Props {
  process: Process;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const Process = ({ process, onDelete, onEdit }: Props) => {
  return (
    <div className="process">
      <h3 className="process__title">{process.title}</h3>
      <p className="process__description">{process.description}</p>
      <div className="process__actions">
        <IconButton aria-label="delete" onClick={() => onDelete(process.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={() => onEdit(process.id)}>
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Process;
