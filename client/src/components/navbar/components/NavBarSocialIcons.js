import { socialIconsList } from "../../../assets/data";

function NavBarSocialIcons() {
  return (
    <span className="flex flex-row gap-6">
      {socialIconsList.map((icon) => {
        return (
          <a key={icon.name} href={icon.link}>
            <svg
              className="hidden xl:block w-8 h-8 hover:cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox={icon.viewBox}
            >
              <g className="hover:fill-d" fill="#fff">
                <path d={icon.svg} />
              </g>
            </svg>
          </a>
        );
      })}
    </span>
  );
}

export default NavBarSocialIcons;
