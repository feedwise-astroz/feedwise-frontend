
import Logo from "../../assets/logo/logotype.png";
import "./Header.scss";

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
