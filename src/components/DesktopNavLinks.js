import React from "react";
import { NavLink } from "react-router-dom";

const DesktopNavLinks = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
      <NavLink
        className="font-montserrat font-light mx-1 text-gray-100 p-2 hover:bg-gray-700 hover:text-white rounded transition duration-300  text-center  whitespace-nowrap"
        activeClassName="bg-gray-700"
        to="/"
      >
        Home Page
      </NavLink>
      <NavLink
        className="font-montserrat mx-1 text-gray-100 p-2 hover:bg-gray-700 hover:text-white rounded transition duration-300  text-center"
        activeClassName="bg-gray-700"
        to="/subcategories/men"
      >
        Men
      </NavLink>
      <NavLink
        className="font-montserrat mx-1 text-gray-100 p-2 hover:bg-gray-700 hover:text-white rounded transition duration-300  text-center"
        activeClassName="bg-gray-700"
        to="/subcategories/women"
      >
        Women
      </NavLink>
      <NavLink
        className="font-montserrat mx-1 text-gray-100 p-2 hover:bg-gray-700 hover:text-white rounded transition duration-300  text-center"
        activeClassName="bg-gray-700"
        to="/category/accessories"
      >
        Accessories
      </NavLink>
      <NavLink
        className="font-montserrat mx-1 text-gray-100 p-2 hover:bg-gray-700 hover:text-white rounded transition duration-300  text-center"
        activeClassName="bg-gray-700"
        to="/contact"
      >
        Contact
      </NavLink>
    </div>
  );
};

export default DesktopNavLinks;
