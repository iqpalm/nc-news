import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/NC News-logos.jpeg";
const Header = () => {
  return (
    <header className="Header">
      <Link to="/">
        <img id="logo" src={logo} alt="NC News logo"></img>
      </Link>
    </header>
  );
};

export default Header;
