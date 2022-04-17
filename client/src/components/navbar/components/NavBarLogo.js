import React from "react";
import { Link } from "react-router-dom";
import logo3 from "../../../assets/images/testu.png";

function NavBarLogo() {
  return (
    <Link to="/">
      <img
        className="max-h-20 min-w-[12] navsvghover"
        src={logo3}
        alt="Logo des Betreibers der Seite"
      />
    </Link>
  );
}

export default NavBarLogo;
