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

const Process = () => {
  const steps = useSelector((state: RootState) => state.Step.steps);
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [currentStep, setCurrentStep] = useState<IStep>({} as IStep);

  useEffect(() => {
    dispatch(get(params.id));
  }, []);

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

  const handleEdit = (step: IStep) => {};

  return (
    <>
      <Header />
      <div className={`process`}>{params.id}</div>
      {steps.map((step) => (
        <Step onClick={handleClick} onDelete={handleDelete} step={step} key={step.id} />
      ))}
      <Sidebar open={Boolean(currentStep?.id)} description={currentStep.description} handleClose={handleClosetStep} onChange={() => {}} completed={false} />
      <Button onClick={handleAdd} className="processes__add-button" variant="contained">
        Добавить
      </Button>
    </>
  );
};

export default Process;
