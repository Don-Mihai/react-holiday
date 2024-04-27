import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PStepPost } from '../../redux/Step/types';
import { AppDispatch, RootState } from '../../redux/store';
import { get, post } from '../../redux/Step';
import { useEffect } from 'react';

const Process = () => {
  const steps = useSelector((state: RootState) => state.Step.steps);
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <>
      <Header />
      <div className={`process`}>{params.id}</div>
      {steps.map((step) => (
        <div key={step.id}>
          {step.title} - {step.description}
        </div>
      ))}
      <Button onClick={handleAdd} className="processes__add-button" variant="contained">
        Добавить
      </Button>
    </>
  );
};

export default Process;
