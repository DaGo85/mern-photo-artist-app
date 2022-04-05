import React from "react";
import { Link } from "react-router-dom";

function NavBarLogo() {
  return (
    <Link to="/">
      <img src="logo.jfif" alt="app-owner-logo" />
    </Link>
  );
}

export default NavBarLogo;
