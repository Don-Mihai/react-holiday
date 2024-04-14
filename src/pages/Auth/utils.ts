export const validatePassword = (value: string = '') => {
  if (value.length <= 0) {
    return 'Пустой пароль!';
  }
  if (value.length < 8) {
    return 'Длина пароля должна быть не менее 8 символов!';
  }
  return '';
};

export const validateEmail = (value: string = '') => {
  if (value.length <= 0) {
    return 'Пустая почта!';
  }
  if (!checkEmail(value)) {
    return 'Почта должна быть в формате *@*.* !';
  }

  function checkEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return '';
};

export const validate = (newErrors: object) => {
  for (const value of Object.values(newErrors)) {
    if (value !== '') {
      return false;
    }
  }
  return true;
};
