import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PStepPost } from '../../redux/Step/types';
import { AppDispatch, RootState } from '../../redux/store';
import { get, post, remove } from '../../redux/Step';
import { useEffect, useState } from 'react';
import Step from '../../components/Step';
import Sidebar from '../../components/Sidebar';
import { Step as IStep } from '../../redux/Step/types';
import { getProcessById, update } from '../../redux/Process';
import { update as stepUpdate } from '../../redux/Step';
import { Process as IProcess } from '../../redux/Process/types';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './style.scss';

const Process = () => {
  const steps = useSelector((state: RootState) => state.Step.steps);
  const [process, setProcess] = useState<IProcess>({} as IProcess);
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [currentStep, setCurrentStep] = useState<IStep>({} as IStep);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProcess();
    dispatch(get(params.id));
  }, []);

  const getProcess = async () => {
    const process = await dispatch(getProcessById(params.id)).unwrap();

    setProcess(process);
  };

  const handleAdd = async () => {
    const payload: PStepPost = {
      title: 'Новый шаг',
      description: 'Описание нового шага',
      processId: params.id || '',
      completed: false,
    };

    dispatch(post(payload));
  };

  const handleDelete = (id: string) => {
    dispatch(remove(id));
  };

  const handleClick = (step: IStep) => {
    setCurrentStep(step);
  };

  const handleClosetStep = () => {
    setCurrentStep({} as IStep);
  };

  const handleSave = () => {
    dispatch(update(process));
  };

  const handleChangeProcess = (e: any) => {
    setProcess({ ...process, [e.target.name]: e.target.value });
  };

  const handleSaveStep = () => {
    dispatch(stepUpdate(currentStep));
  };

  const handleChangeStep = (e: any) => {
    setCurrentStep({ ...currentStep, completed: e.target.value === 'true' ? true : false });
  };

  console.log(currentStep);

  return (
    <div className="page-process">
      <Header />
      <div className="page-process__header">
        <div className="page-process__title">{process.title}</div>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </div>

      {steps.map((step) => (
        <Step onClick={handleClick} onDelete={handleDelete} step={step} key={step.id} />
      ))}
      {/* все инпуты передать через children */}
      <Sidebar open={open} handleClose={() => setOpen(false)} handleSave={handleSave}>
        <TextField
          label="Описание"
          multiline
          rows={4}
          value={process.description}
          name="description"
          onChange={handleChangeProcess}
          variant="outlined"
          fullWidth
          style={{ marginBottom: '20px' }}
        />
      </Sidebar>

      <Sidebar open={Boolean(currentStep?.id)} handleClose={handleClosetStep} handleSave={handleSaveStep}>
        <ToggleButtonGroup color="primary" value={currentStep.completed} exclusive onChange={handleChangeStep} fullWidth style={{ marginBottom: '20px' }}>
          <ToggleButton value={false}>Незавершенная</ToggleButton>
          <ToggleButton value={true} color="success">
            Завершенная
          </ToggleButton>
        </ToggleButtonGroup>
      </Sidebar>
      <Button onClick={handleAdd} className="page-process__add-button" variant="contained">
        Добавить
      </Button>
    </div>
  );
};

export default Process;
