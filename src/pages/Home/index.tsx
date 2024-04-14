import axios from 'axios';
import DiagramFlow from '../../components/DiagramFLow';
import { useEffect, useState } from 'react';
import { User } from '../../redux/User/type';
import Header from '../../components/Header';

const Home = () => {
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userId = localStorage.getItem('userId');
    const user = (await axios.get(`http://localhost:3001/users/${userId}`)).data;
    setUser(user);
  };

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <h2>{user?.email}</h2>
      <DiagramFlow />
    </div>
  );
};

export default Home;
