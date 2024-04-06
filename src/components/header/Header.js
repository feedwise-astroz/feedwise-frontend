import Logo from "../../assets/logo/green-logo.svg";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../service/authService";
import { useState } from "react";
import Card from "../card/Card";
import Logomark from "../../assets/logo/profile-photo.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const name = useSelector(selectName);
  console.log(name)

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/");
    setIsDropdownVisible(false);
  };
  const toggleDropdown = () => {
    // Toggle the visibility of the dropdown
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="header-card">
      <Card>
<div className="flex justify-between items-center mx-2 my-4">
      <div className="">
        <img
          src={Logo}
          alt="Logo"
          className="logo w-36"
        />
      </div>
      <div className="relative">
        <div onClick={toggleDropdown} className="flex items-center cursor-pointer">
          <img
            src={Logomark} 
            alt="Profile"
            className="photo rounded-full h-8 w-8 mr-2"
          />
        </div>

        {isDropdownVisible && (
          <div className="absolute top-full right-0 mt-1 bg-white border rounded shadow-lg">
           
            <button onClick={logout} className="block w-full px-4 py-2 text-sm text-gray-600 hover:text-black focus:outline-none">
              Logout
            </button>
            
          </div>
        )}
      </div>
    </div>
    </Card>
    </div>


  );
};

export default Header;
