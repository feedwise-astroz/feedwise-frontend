import React from 'react';
import './Button3.scss'

const Button1 = ({ onClick, children, className }) => {
  return (
    <div class="button3-container">
    <button className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
    </div>
  );
};

export default Button1;
