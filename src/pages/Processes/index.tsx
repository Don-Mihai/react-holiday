import { Button, TextField } from '@mui/material';
import Header from '../../components/Header';
import Process from '../../components/Process';
import { useEffect, useState } from 'react';
import './Processes.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { get, post, remove } from '../../redux/Process';
import { PProcessPost } from '../../redux/Process/types';

const Processes = () => {
  const { processes, isLoading } = useSelector((state: RootState) => state.Process);
  const [searchValues, setSearchValues] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(get());
  }, []);

  const onChange = (event: any) => {
    setSearchValues(event.target.value);
  };

  console.log(searchValues);

  const handleDelete = (id: string) => {
    dispatch(remove(id));
  };

  const handleAdd = async () => {
    const payload: PProcessPost = {
      title: 'Новый процесс',
      description: 'Описание нового процесса',
    };

    dispatch(post(payload));
  };

  return (
    <div className="processes">
      <Header />
      <TextField className="processes__input" onChange={onChange} value={searchValues} label="Поиск" variant="outlined" />

      {processes
        .filter((process) => {
          const lowSearchValues = searchValues.toLowerCase();

          const title = process.title.toLowerCase();
          const description = process.description.toLowerCase();

          return title.includes(lowSearchValues) || description.includes(lowSearchValues);
        })
        .map((process) => (
          <Process onDelete={handleDelete} process={process} key={process.id} />
        ))}
      <Button onClick={handleAdd} className="processes__add-button" variant="contained">
        Добавить
      </Button>
    </div>
  );
};

export default Processes;
