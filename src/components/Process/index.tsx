import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.scss';
import { useNavigate } from 'react-router-dom';

interface Process {
  id: number;
  title: string;
  description: string;
}

interface Props {
  process: Process;
  onDelete: (id: number) => void;
}

const Process = ({ process, onDelete }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="process" onClick={() => navigate(`${process.id}`)}>
      <h3 className="process__title">{process.title}</h3>
      <p className="process__description">{process.description}</p>
      <div className="process__actions">
        <IconButton aria-label="delete" onClick={() => onDelete(process.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Process;
