import { TextField, TextFieldProps } from '@mui/material';
import './TextInputLabelTop.scss';
import { useState } from 'react';

const initialState = {
  login: '',
  password: '',
};

const TextInputLabelTop = (props: TextFieldProps) => {
  return (
    <div className="box">
      <label className="label" htmlFor={props.id}>
        {props.label}
      </label>
      <TextField {...props} label="" />
    </div>
  );
};

export default TextInputLabelTop;
