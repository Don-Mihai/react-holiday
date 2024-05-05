import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { Process as IProcess } from '../../redux/Process/types';

interface Props {
  process: IProcess;
  onDelete: (id: string) => void;
}

const Process = ({ process, onDelete }: Props) => {
  const navigate = useNavigate();

  const handleDelete = (event: any) => {
    event.stopPropagation();
    onDelete(process.id);
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
    </div>
  );
};

export default Process;
