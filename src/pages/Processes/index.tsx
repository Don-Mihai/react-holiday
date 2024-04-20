import { Button } from '@mui/material';
import Header from '../../components/Header';
import Process from '../../components/Process';
import { useState } from 'react';
import './Processes.scss';

const Processes = () => {
  const initialProcesses = [
    {
      id: 1,
      title: 'Процесс 1',
      description: 'Описание процесса 1',
    },
    {
      id: 2,
      title: 'Процесс 2',
      description: 'Описание процесса 2',
    },
    {
      id: 3,
      title: 'Процесс 3',
      description: 'Описание процесса 3',
    },
  ];

  const [processes, setProcesses] = useState(initialProcesses);

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleAdd = () => {
    let i = processes.length + 1;
    setProcesses((prev) => [...prev, { id: i, title: 'Процесс ' + i, description: 'Описание процесса ' + i }]);
  };

  const handleEdit = (id: number) => {
    console.log(id);
  };
  return (
    <div className="processes">
      <Header />
      {processes.map((process) => (
        <Process onDelete={handleDelete} process={process} key={process.id} />
      ))}
      <Button onClick={handleAdd} className="processes__add-button" variant="contained">
        Добавить
      </Button>
    </div>
  );
};

export default Processes;
