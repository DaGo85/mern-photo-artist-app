import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.jfif";

function NavBarLogo() {
  return (
    <Link to="/">
      <img src={logo} alt="app-owner-logo" />
    </Link>
  );
}

export default NavBarLogo;
