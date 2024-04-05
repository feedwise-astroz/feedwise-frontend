import React from 'react';
import './Form.scss'

const FormInput = ({ className, ...rest }) => {
  return (
    <input
      {...rest}
      className={`border-2 border-black rounded-lg px-3 py-4 mb-10 mt-1 w-full ${className}`}
    />
  );
};

export default FormInput;
