// Logo component for NavBar

import logo3 from "../../../assets/images/testu.png";

import { Link } from "react-router-dom";

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
