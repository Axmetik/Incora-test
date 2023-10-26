import { NavLink } from "react-router-dom";
import "./Header.css";
import nasa from "../assets/nasa.png";

function Header({ isAuthorized, handleClick }) {
  return (
    <header className="header">
      <div className="header__logo">
        Incora Test Slavych
      </div>
      {isAuthorized && (
        <div className="btns">
          <NavLink to={"/"}>
            <span
              className="header__button"
              onClick={handleClick}
            >
              Log out
            </span>
          </NavLink>
          <NavLink to={"/posts"}>
            <span className="header__button btn-1">
              Posts
            </span>
          </NavLink>
          <NavLink to={"/nasa"}>
            <img
              className="header__nasa"
              src={nasa}
              alt="nasa"
            />
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
