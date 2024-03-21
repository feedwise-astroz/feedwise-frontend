import React from 'react';
import './Form.scss'

const FormButton = ({ type, children }) => {
  return (
    <div className='button-primary-color mt-4 rounded-lg'>
    <button type={type} className="text-white font-bold py-4 px-4 rounded-lg w-full ">
      {children}
    </button>
    </div>
  );
};

export default FormButton;
