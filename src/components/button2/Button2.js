import React from 'react';
import './Button2.scss';
import { IoIosArrowBack } from "react-icons/io";

const Button2 = ({ onClick, children, className }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      <IoIosArrowBack />
      {children}
    </button>
  );
};

export default Button2;

