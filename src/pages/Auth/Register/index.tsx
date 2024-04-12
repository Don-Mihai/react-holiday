import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Props {
  handleClick: () => void;
}

const Register = ({ handleClick }: Props) => {
  return (
    <>
      <h2 className="auth__title">Регистрация</h2>
      <div className="auth__block">
        <TextField label="Почта" variant="outlined" fullWidth />
        <TextField label="Пароль" variant="outlined" fullWidth />
        <Button variant="outlined" size="medium">
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
