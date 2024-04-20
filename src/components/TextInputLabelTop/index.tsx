import { TextField, TextFieldProps } from '@mui/material';
import './TextInputLabelTop.scss';
import { useState } from 'react';

interface Props {}

const TextInputLabelTop = ({ name, label, ...rest }: TextFieldProps) => {
  return (
    <div className="box">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <TextField id={name} name={name} {...rest} label="" />
    </div>
  );
};

export default TextInputLabelTop;
