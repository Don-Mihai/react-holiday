import { Avatar, TextField, TextFieldProps } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import TextInputLabelTop from '../../components/TextInputLabelTop';
import './Profile.scss';
import Header from '../../components/Header';
import FileDrop from '../../components/FileDrop';
import axios from 'axios';
import { getFullImageUrl, SERVER_URL } from '../../utils';
import { getUserById } from '../../redux/User';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  login: '',
  password: '',
  name: '',
};

const Profile = () => {
  const [formValues, setFormValues] = useState(initialState);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.User.user);
  useEffect(() => {
    // @ts-ignore
    dispatch(getUserById());
  }, []);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    alert(JSON.stringify(formValues));
  };

  const handleUpload = async (file: Blob) => {
    const formData = new FormData();
    const userId = localStorage.getItem('userId') || '';

    formData.append('filedata', file);
    formData.append('id', userId);

    axios.post(SERVER_URL + 'user/upload-avatar', formData);
  };

  return (
    <div className="profile">
      <Header />
      <div className="profile__block">
        <h2 className="profile__title">Профиль</h2>
        <FileDrop onSendFiles={handleUpload}>
          <Avatar alt="Аватар" src={getFullImageUrl(SERVER_URL, user.imgUrl)} sx={{ width: 150, height: 150 }} />
        </FileDrop>

        <TextInputLabelTop onChange={onChange} name="name" label="Имя" value={formValues.name} variant="outlined" fullWidth />
        <TextInputLabelTop onChange={onChange} name="login" label="Почта" value={formValues.login} variant="outlined" fullWidth />
        <TextInputLabelTop onChange={onChange} name="password" label="Пароль" value={formValues.password} variant="outlined" fullWidth />
        <Button onClick={handleSave} variant="contained" size="medium">
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default Profile;
