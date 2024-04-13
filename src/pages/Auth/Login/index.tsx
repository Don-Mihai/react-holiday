import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

interface Props {
  handleClick: () => void;
}

const Login = ({ handleClick }: Props) => {
  const [loginVal, setLoginVals] = useState('');
  const [passwordVal, setPasswordVal] = useState('');
  const [loginErrorFlag, setLoginErrorFlag] = useState(false);
  const [passwordErrorFlag, setPasswordErrorFlag] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVals(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVal(event.target.value);
  };

  const clickConfirm = () => {
    validateLogin();
    validatePassword();
  };

  const validatePassword = () => {
    setPasswordErrorFlag(false);
    setPasswordErrorText('');
    if (passwordVal.length <= 0) {
      setPasswordErrorFlag(true);
      setPasswordErrorText('Пустой пароль!');
      return;
    }
    if (passwordVal.length <= 8) {
      setPasswordErrorFlag(true);
      setPasswordErrorText('Длина пароля должна быть не менее 8 символов!');
      return;
    }
  };

  const validateLogin = () => {
    setLoginErrorFlag(false);
    setLoginErrorText('');
    if (loginVal.length <= 0) {
      setLoginErrorFlag(true);
      setLoginErrorText('Пустой логин!');
      return;
    }
    if (!validateEmail(loginVal)) {
      setLoginErrorFlag(true);
      setLoginErrorText('Логин должен быть в формате *@*.* !');
      return;
    }
  };

  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <>
      <h2 className="auth__title">Авторизация</h2>
      <div className="auth__block">
        <TextField onChange={changeLogin} label="Почта" variant="outlined" fullWidth helperText={loginErrorText} error={loginErrorFlag} />
        <TextField onChange={changePassword} label="Пароль" variant="outlined" fullWidth helperText={passwordErrorText} error={passwordErrorFlag} />
        <Button onClick={clickConfirm} variant="outlined" size="medium">
          Подтвердить
        </Button>
      </div>
      <div className="auth__link">
        Нет учетной записи?{' '}
        <span onClick={handleClick} className="auth__link-text">
          Зарегистрируйтесь
        </span>
      </div>
    </>
  );
};

export default Login;
