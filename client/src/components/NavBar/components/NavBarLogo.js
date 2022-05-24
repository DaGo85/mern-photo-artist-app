// Logo component for NavBar

import ago from "../../../assets/images/ago7.png";

import { Link } from "react-router-dom";

function NavBarLogo() {
  return (
    <Link to="/">
      <img
        className="max-h-20 min-w-[12] navsvghover"
        src={ago}
        alt="Logo des Betreibers der Seite"
      />
    </Link>
  );
}

export default NavBarLogo;
