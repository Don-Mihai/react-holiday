import TextField from '@mui/material/TextField';

interface Props {
  handleClick: () => void;
}

const Login = ({ handleClick }: Props) => {
  return (
    <>
      <h2 className="auth__title">Авторизация</h2>
      <div className="auth__block">
        <TextField label="Почта" variant="outlined" fullWidth />
        <TextField label="Пароль" variant="outlined" fullWidth />
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
