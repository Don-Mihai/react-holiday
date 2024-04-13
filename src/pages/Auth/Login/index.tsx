import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

interface Props {
  handleClick: () => void;
}

// test
const initialState = {
  login: '',
  password: '',
};

const Login = ({ handleClick }: Props) => {
  const [formValues, setFormValues] = useState(initialState);
  const [errorsText, setErrorsText] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const clickConfirm = () => {
    validateLogin();
    validatePassword();
  };

  const clearError = (key: string) => {
    setErrorsText((prev) => ({ ...prev, [key]: '' }));
  };

  const validatePassword = () => {
    clearError('password');
    if (formValues.password.length <= 0) {
      setErrorsText((prev) => ({ ...prev, password: 'Пустой пароль!' }));
      return;
    }
    if (formValues.password.length <= 8) {
      setErrorsText((prev) => ({ ...prev, password: 'Длина пароля должна быть не менее 8 символов!' }));
      return;
    }
  };

  const validateLogin = () => {
    clearError('login');
    if (formValues.login.length <= 0) {
      setErrorsText((prev) => ({ ...prev, login: 'Пустой логин!' }));
      return;
    }
    if (!validateEmail(formValues.login)) {
      setErrorsText((prev) => ({ ...prev, login: 'Логин должен быть в формате *@*.* !' }));
      return;
    }
  };

  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  console.log(errorsText);
  return (
    <>
      <h2 className="auth__title">Авторизация</h2>
      <div className="auth__block">
        <TextField
          onChange={onChange}
          name="login"
          label="Почта"
          value={formValues.login}
          variant="outlined"
          fullWidth
          helperText={errorsText.login}
          error={Boolean(errorsText.login)}
          onFocus={() => clearError('login')}
          onBlur={() => validateLogin()}
        />
        <TextField
          onChange={onChange}
          name="password"
          label="Пароль"
          value={formValues.password}
          variant="outlined"
          fullWidth
          helperText={errorsText.password}
          error={Boolean(errorsText.password)}
          onFocus={() => clearError('password')}
          onBlur={() => validatePassword()}
        />
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
