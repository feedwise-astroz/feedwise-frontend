import React, { useState } from "react";
import "./Sidebar.scss";
import Sidebaritem from "./Sidebaritem";
import menu from "../../data/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../service/authService";
import MobileBottombar from "./MobileBottombar";

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
    <div className="layout ">
      <div className="sidebar hidden sm:block">
        {menu.map((item, index) => {
          return <Sidebaritem key={index} item={item} />;
        })}
      </div>

      <main>{children}</main>
      <MobileBottombar />
      <div className="hidden sm:block">
        <div onClick={toggleDropdown}>
          <img
            src="path/to/profile-photo.jpg" // Replace with the actual path to the photo
            alt="Profile"
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
  );
};

export default Sidebar;
