import React from 'react';

const FormInput = ({ className, ...rest }) => {
  return (
    <input
      {...rest}
      className={`border rounded px-3 py-2 mb-4 w-full ${className}`}
    />
  );
};

export default FormInput;
