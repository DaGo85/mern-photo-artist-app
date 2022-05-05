// Route link component for NavBar

import { Link } from "react-router-dom";
import { navLinks } from "../../../assets/data";
import { useAuthContext } from "../../../utility/AuthContextProvider";

function NavBarLinks({ toggleNav }) {
  const { userCreds } = useAuthContext();
  return (
    <>
      {navLinks.map((item) => {
        return (
          <Link
            key={item.name}
            to={item.link}
            aria-label={`link to ${item.name}`}
          >
            <li
              onClick={() => {
                if (toggleNav) {
                  toggleNav();
                }
              }}
              className="text-2xl text-white navhover transition-all duration-300"
            >
              {item.name}
            </li>
          </Link>
        );
      })}
      {userCreds && (
        <Link to="/write">
          <li
            onClick={() => {
              if (toggleNav) {
                toggleNav();
              }
            }}
            className="navhover text-2xl text-basic"
          >
            Hinzufügen
          </li>
        </Link>
      )}
    </>
  );
}

export default NavBarLinks;
