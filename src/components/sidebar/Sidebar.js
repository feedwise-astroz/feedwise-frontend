import React, { useState } from "react";
import "./Sidebar.scss";
import Sidebaritem from "./Sidebaritem";
import menu from "../../data/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../service/authService";
import MobileBottombar from "./MobileBottombar";
import Logo from "../../assets/logo/Logo.png";

const Sidebar = ({ children }) => {
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
    <div className="sidebar-container sidebar hidden sm:block bg-green w-1/4">
      <div className="flex ml-2 mr-2 items-center justify-center my-10 border-b border-white pb-6">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-60" />{" "}
        {/* Adjust the width as needed */}
      </div>
      <div className="sidebar-items">
        {/* Sidebar items */}
        {menu.map((item, index) => (
          <Sidebaritem key={index} item={item} />
        ))}
      </div>
      <div className="profile-section">
        {/* User profile */}
        <div className="profile-info">
          <div
            onClick={toggleDropdown}
            className="flex items-center"
          >
            <img
              src="path/to/profile-photo.jpg"
              className="photo"
            />
            <span className="name">{name}</span>
          </div>
          {isDropdownVisible && (
            <div>
              {/* Dropdown content */}
              <button onClick={logout}>Logout</button>
              {/* Add other dropdown items as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
