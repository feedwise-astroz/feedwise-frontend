import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/logo/logotype.png";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../service/authService";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";

const Header = () => {
  return (
    <div className="header">
      <div className="leftCorner">
        <img
          src={Logo}
          alt="Logo"
          // onClick={goHome}
          className="logo"
        />
      </div>

    </div>
  );
};

export default Header;
