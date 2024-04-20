import { useParams } from 'react-router-dom';
import Header from '../../components/Header';

const Process = () => {
  const params = useParams();

  return (
    <>
      <Header />
      <div className={`process`}>{params.id}</div>
    </>
  );
};

export default Process;
