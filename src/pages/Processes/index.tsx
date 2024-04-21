import { Button } from '@mui/material';
import Header from '../../components/Header';
import Process from '../../components/Process';
import { useEffect, useState } from 'react';
import './Processes.scss';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { PProcessPost } from '../../redux/Process/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { get } from '../../redux/Process';

const Processes = () => {
  const { processes, isLoading } = useSelector((state: RootState) => state.Process);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(get());
  }, []);

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleAdd = async () => {};

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
