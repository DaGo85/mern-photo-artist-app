// Route link component for NavBar

import { navLinks } from "../../../assets/data";
import { useAuthContext } from "../../../utility/AuthContextProvider";

import { Link } from "react-router-dom";

function NavBarLinks({ toggleNav }) {
  const { userCreds } = useAuthContext();
  return (
    <>
      {navLinks.map((item) => {
        return (
          <li
            key={item.name}
            onClick={() => {
              if (toggleNav) {
                toggleNav();
              }
            }}
            className="text-2xl text-white navhover transition-all duration-300"
          >
            <Link to={item.link} aria-label={`link to ${item.name}`}>
              {item.name}
            </Link>
          </li>
        );
      })}
      {userCreds && (
        <li
          onClick={() => {
            if (toggleNav) {
              toggleNav();
            }
          }}
          className="navhover text-2xl text-basic"
        >
          <Link to="/write">Hinzufügen</Link>
        </li>
      )}
    </>
  );
}

export default NavBarLinks;
