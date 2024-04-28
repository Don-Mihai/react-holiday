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
import { Process as IProcess } from '../../redux/Process/types';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
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

  const handleChangeProcess = (field: string, newValue: any) => {
    setProcess({ ...process, [field]: newValue.target.value });
  };

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
      <Sidebar open={open} description={process.description} handleClose={() => setOpen(false)} onChange={handleChangeProcess} completed={false} />
      <Sidebar open={Boolean(currentStep?.id)} description={currentStep.description} handleClose={handleClosetStep} onChange={() => {}} completed={false} />
      <Button onClick={handleAdd} className="page-process__add-button" variant="contained">
        Добавить
      </Button>
    </div>
  );
};

export default Process;
