import React from "react";
import { navLinks } from "../../../assets/data";

function NavBarLinks({ toggleNav }) {
  return (
    <>
      {navLinks.map((item) => {
        return (
          <a key={item.name} href={item.link}>
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
          </a>
        );
      })}
      <a href="/write">
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
      </a>
    </>
  );
}

export default NavBarLinks;
