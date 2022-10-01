import cs from "classnames";
import React from "react";
import NextLink from "next/link";
type NavBarItemProps = {
  state?: "active" | "disabled" | "normal";
};

const NavBarItem: React.FunctionComponent<NavBarItemProps> = ({
  children,
  state,
}) => {
  const className = cs(
    "cursor-pointer hover:border-white hover:border-solid hover:border-b-2  hover:text-white",
    {
      "text-gray-600": state === "disabled",
      "text-white scale-[1.08]": state === "active",
      "text-gray-500": state == "normal",
    }
  );

  return (
    <li className="transition group hover:scale-110">
      <a className={className}>{children}</a>
    </li>
  );
};
NavBarItem.defaultProps = {
  state: "active",
};

export const NavBar = () => {
  return (
    <div className="flex justify-center items-center bg-brand-primary h-[80px] text-white w-screen">
      <div className="flex items-center justify-between w-4/5">
        <NextLink href="/">
          <a className="centered border-2 border-solid hover:bg-white hover:text-black border-white w-[95px] h-[50px]">
            <span className="text-xl italic font-bold">Shop</span>
          </a>
        </NextLink>

        <ul className="flex gap-5">
          <NavBarItem>Inicio</NavBarItem>
          <NavBarItem>About</NavBarItem>
          <NavBarItem>About</NavBarItem>
        </ul>
      </div>
    </div>
  );
};
