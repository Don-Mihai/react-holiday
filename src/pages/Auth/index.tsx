import './Auth.scss';
import { useState } from 'react';
import Register from './Register';
import Login from './Login';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);

  const handleClick = () => {
    setIsRegister(!isRegister);
  };
  return <div className="auth">{isRegister ? <Register handleClick={handleClick} /> : <Login handleClick={handleClick} />}</div>;
};

export default Auth;
