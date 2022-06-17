// Route link component for NavBar

import { navLinks } from "../../../assets/data";
import { useAuthContext } from "../../../utility/AuthContextProvider";

import CustomLink from "../../elements/CustomLink/CustomLink";

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
            <CustomLink to={item.link} aria-label={`link to ${item.name}`}>
              {item.name}
            </CustomLink>
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
          <CustomLink to="/write">Hinzufügen</CustomLink>
        </li>
      )}
    </>
  );
}

export default NavBarLinks;
