import Button from '@mui/material/Button';
import { useState } from 'react';
import { validate, validateEmail, validatePassword } from '../utils';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  handleClick: () => void;
}

interface State {
  [key: string]: string;
}

const initialState: State = {
  email: '',
  password: '',
};

const Register = ({ handleClick }: Props) => {
  const [formValues, setFormValues] = useState(initialState);
  const [errorsText, setErrorsText] = useState(initialState);

  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirm = async () => {
    const newErrors = {
      email: validateEmail(formValues.email),
      password: validatePassword(formValues.password),
    };
    setErrorsText(newErrors);

    if (validate(newErrors)) {
      const user = (await axios.post('http://localhost:3001/users', formValues)).data;

      localStorage.setItem('userId', user.id);

      navigate('/');
    }
  };

  const clearError = (key: string) => {
    setErrorsText((prev) => ({ ...prev, [key]: '' }));
  };

  const handleBlur = (event: any) => {
    setErrorsText((prev) => ({
      ...prev,
      [event.target.name]: 'email' ? validateEmail(formValues.email) : validatePassword(formValues.password),
    }));
  };

  return (
    <>
      <h2 className="auth__title">Регистрация</h2>
      <div className="auth__block">
        <TextField
          onChange={onChange}
          name="email"
          label="Почта"
          value={formValues.email}
          variant="outlined"
          fullWidth
          helperText={errorsText.email}
          error={Boolean(errorsText.email)}
          onFocus={() => clearError('email')}
          onBlur={handleBlur}
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
          onBlur={handleBlur}
        />
        <Button onClick={handleConfirm} variant="outlined" size="medium">
          Подтвердить
        </Button>
      </div>
      <div className="auth__link">
        Уже зарегистрированы?{' '}
        <span onClick={handleClick} className="auth__link-text">
          Войдите
        </span>
      </div>
    </>
  );
};

export default Register;
