import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../../assets/data";

function NavBarLinks({ toggleNav }) {
  return (
    <>
      {navLinks.map((item) => {
        return (
          <Link key={item.name} to={item.link}>
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
    </>
  );
}

export default NavBarLinks;
