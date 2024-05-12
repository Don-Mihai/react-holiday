import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PStepPost, emptyStep } from '../../redux/Step/types';
import { AppDispatch, RootState } from '../../redux/store';
import { get, post, remove } from '../../redux/Step';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import GridViewIcon from '@mui/icons-material/GridView';
import './style.scss';
import DiagramFlow from '../../components/DiagramFLow';
import { getEdges } from '../../redux/Diagram';

const Process = () => {
  const steps = useSelector((state: RootState) => state.Step.steps);
  const edges = useSelector((state: RootState) => state.Diagram.edges);
  const [process, setProcess] = useState<IProcess>({} as IProcess);
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [currentStep, setCurrentStep] = useState<IStep>(emptyStep);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    getProcess();
    dispatch(getEdges(params.id));
    dispatch(get(params.id));
  }, []);

  const getProcess = async () => {
    const process = await dispatch(getProcessById(params.id)).unwrap();

    setProcess(process);
  };

  const handleAdd = async () => {
    const payload: PStepPost = {
      data: {
        title: 'Новый шаг',
        description: 'Описание нового шага',
        processId: params.id || '',
        completed: false,
      },
      position: {
        x: 0,
        y: steps.length * 100,
      },
    };

    dispatch(post(payload));
  };

  const handleDelete = useCallback((id: string) => {
    dispatch(remove(id));
  }, []);

  const handleClosetStep = () => {
    setCurrentStep(emptyStep);
  };

  const handleSave = () => {
    dispatch(update(process));
  };

  const handleChangeProcess = (e: any) => {
    setProcess({ ...process, [e.target.name]: e.target.value });
  };

  const handleSaveStep = (innerValues: any) => {
    dispatch(stepUpdate({ ...currentStep, data: { ...currentStep.data, ...innerValues } }));
  };

  const handleChangeStep = (e: any) => {
    let value = e.target.value;

    if (e.target.name === 'completed') {
      value = value === 'true';
    }

    setCurrentStep({ ...currentStep, data: { ...currentStep.data, [e.target.name]: value } });
  };

  const handleClick = useCallback((step: IStep) => {
    setCurrentStep(step);
  }, []);

  return (
    <div className="page-process">
      <Header />
      <div className="page-process__header">
        <div className="page-process__title">{process.title}</div>
        <IconButton onClick={() => setMode(!mode)}>
          <GridViewIcon />
        </IconButton>

        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </div>

      <Sidebar open={open} handleClose={() => setOpen(false)} handleSave={handleSave}>
        <TextField label="Название" value={process.title} name="title" onChange={handleChangeProcess} variant="outlined" />
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

      {!mode ? (
        steps.map((step) => <Step onClick={handleClick} onDelete={handleDelete} step={step} key={step.id} />)
      ) : (
        <DiagramFlow diagramNodes={steps} diagramEdges={edges} parentId={params?.id} onClick={handleClick}></DiagramFlow>
      )}

      <Sidebar open={Boolean(currentStep?.id)} handleClose={handleClosetStep} handleSave={handleSaveStep}>
        <TextField onChange={handleChangeStep} name="title" value={currentStep?.data?.title} label="Название" variant="outlined" />
        <TextField
          label="Описание"
          multiline
          rows={4}
          value={currentStep?.data?.description}
          name="description"
          onChange={handleChangeStep}
          variant="outlined"
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <ToggleButtonGroup
          color="primary"
          value={currentStep?.data?.completed}
          exclusive
          onChange={handleChangeStep}
          fullWidth
          style={{ marginBottom: '20px' }}
        >
          <ToggleButton value={false} name="completed">
            Незавершенная
          </ToggleButton>
          <ToggleButton value={true} color="success" name="completed">
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
