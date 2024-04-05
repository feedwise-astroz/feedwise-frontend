import React from 'react';
import './Button1.scss'

const Button1 = ({ onClick, children, className }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button1;
