import React from "react";
import { NavLink } from "react-router-dom";
import { menuData } from "../data/MenuData";

const Header = () => {
  return (
    <div className="header">
      {menuData.map((item, index) => (
        <NavLink
          className="menu-link"
          activeClassName="menu-link-active"
          to={item.link}
          key={index}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Header;
