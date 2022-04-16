import React from "react";
import { Link } from "react-router-dom";
import logo3 from "../../../assets/images/logo3.jpeg";

function NavBarLogo() {
  return (
    <Link to="/">
      <img className="max-h-20" src={logo3} alt="app-owner-logo" />
    </Link>
  );
}

export default NavBarLogo;
