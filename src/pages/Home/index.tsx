import axios from 'axios';
import DiagramFlow from '../../components/DiagramFLow';
import { useEffect, useState } from 'react';
import { User } from '../../redux/User/type';
import Header from '../../components/Header';
import { BASE_URL } from '../../utils';
import FileDrop from '../../components/FileDrop';

const Home = () => {
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userId = localStorage.getItem('userId');
    const user = (await axios.get(`${BASE_URL}users/${userId}`)).data;
    setUser(user);
  };

  const saveImg = (file: Blob) => {
    const formData = new FormData();
    formData.append('filedata', file as Blob);

    axios.post('http://localhost:5000/upload', formData);
  };

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <FileDrop borderRadius="0" onSendFiles={saveImg}>
        <div style={{ padding: '20px', border: '1px solid red', width: '300px' }}>ЗАгружай изображения сюда</div>
      </FileDrop>

      <h2>{user?.email}</h2>
    </div>
  );
};

export default Home;
