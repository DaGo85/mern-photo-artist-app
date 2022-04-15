import React from "react";
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
              className="text-2xl text-white hover:text-d"
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
            className="text-2xl text-white hover:text-d"
          >
            Write
          </li>
        </Link>
      )}
    </>
  );
}

export default NavBarLinks;
