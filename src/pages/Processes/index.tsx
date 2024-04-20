import Header from '../../components/Header';
import Process from '../../components/Process';

const Processes = () => {
  const processes = [
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

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleEdit = (id: number) => {
    console.log(id);
  };
  return (
    <div>
      <Header />
      {processes.map((process) => (
        <Process onDelete={handleDelete} onEdit={handleEdit} process={process} key={process.id} />
      ))}
    </div>
  );
};

export default Processes;
