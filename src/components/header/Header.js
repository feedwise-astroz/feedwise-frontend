import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo/logotype.png'
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser} from '../../service/authService';
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
    setIsDropdownVisible(false);
  };
const toggleDropdown = () => {
  // Toggle the visibility of the dropdown
  setIsDropdownVisible((prev) => !prev);
};


  return (
   
    <div className="header">
 
      <div className="leftCorner">

      
      <img src={Logo}
          alt="Logo"
         // onClick={goHome}
        className="logo"/>
      </div>
      <div className="rightCorner" onClick={toggleDropdown}>
        <img
          src="path/to/profile-photo.jpg"  // Replace with the actual path to the photo
          alt="Profile"
          className="photo"
        />
        <span className="name">{name}</span>
      </div>

      {isDropdownVisible && (
        <div className="dropdown">
          {/* Dropdown content */}
          <button onClick={logout} className='dropdown-item'>Logout</button>
          {/* Add other dropdown items as needed */}
        </div>
      )}
      </div>

  );
};


export default Header;
