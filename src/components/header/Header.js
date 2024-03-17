import Logo from "../../assets/logo/logotype.png";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../service/authService";
import { useState } from "react";

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
<header className="sm:hidden bg-blue-500">
      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="w-24"
      />
      {/* User Profile */}
      <div onClick={toggleDropdown}>
        <img
          src="path/to/profile-photo.jpg"
          alt="Profile"
          className="photo"
        />
        <span className="name">{name}</span>
      </div>
      {isDropdownVisible && (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
