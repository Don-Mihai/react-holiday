import { Avatar, TextField, TextFieldProps } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextInputLabelTop from '../../components/TextInputLabelTop';
import './Profile.scss';

interface InputProps {
  textinput: TextFieldProps;
}

interface Props {
  handleClick: () => void;
}

const initialState = {
  login: '',
  password: '',
  name: '',
};

const Profile = () => {
  const [formValues, setFormValues] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    alert(JSON.stringify(formValues));
  };

  return (
    <div className="profile">
      <div className="profile__block">
        <h2 className="profile__title">Профиль</h2>
        <Avatar alt="Аватар" src="/images/1.png" sx={{ width: 150, height: 150 }} />
        <TextInputLabelTop onChange={onChange} id="name" name="name" label="Имя" value={formValues.name} variant="outlined" fullWidth />
        <TextInputLabelTop onChange={onChange} id="login" name="login" label="Почта" value={formValues.login} variant="outlined" fullWidth />
        <TextInputLabelTop onChange={onChange} id="password" name="password" label="Пароль" value={formValues.password} variant="outlined" fullWidth />
        <Button onClick={handleSave} variant="contained" size="medium">
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default Profile;
