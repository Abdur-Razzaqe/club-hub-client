import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const menu = [];
  return (
    <div className="p-5 space-y-4">
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-teal-100" : "hover:bg-gray-700"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
