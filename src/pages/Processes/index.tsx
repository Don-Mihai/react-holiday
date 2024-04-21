import { Button } from '@mui/material';
import Header from '../../components/Header';
import Process from '../../components/Process';
import { useEffect, useState } from 'react';
import './Processes.scss';
import axios from 'axios';
import { BASE_URL } from '../../utils';

const Processes = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    getProcesses();
  }, []);

  const getProcesses = async () => {
    const response = await axios.get(BASE_URL + 'processes');
    setProcesses(response.data);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleAdd = async () => {
    const payload = { title: 'Новый процесс', description: 'Описание процесса' };

    const process: Process = (await axios.post(BASE_URL + 'processes', payload)).data;

    setProcesses([...processes, process]);
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
