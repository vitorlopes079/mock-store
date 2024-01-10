import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getMenuStyle } from "../utilities/menuSideNavBarSlider";

function SideNavBar({ isMenuOpen, toggleMenu }) {
  const [showManSubcategories, setShowManSubcategories] = useState(false);
  const [showWomenSubcategories, setShowWomenSubcategories] = useState(false);
  const menuStyle = getMenuStyle(isMenuOpen)

  return (
    <div className="bg-white" style={menuStyle}>
      <FontAwesomeIcon
        icon={faTimes}
        className="text-2xl mb-10 cursor-pointer text-gray-900"
        onClick={toggleMenu}
      />
      <div className="flex flex-col">
        <NavLink
          onClick={toggleMenu}
          to="/"
          className="font-montserrat my-3 hover:bg-gray-200 p-2 rounded text-gray-900 text-lg font-bold tracking-wider  border-b-2"
        >
          Home Page
        </NavLink>
        <div
          onMouseEnter={() => setShowManSubcategories(true)}
          onMouseLeave={() => setShowManSubcategories(false)}
        >
          <p className="sideNavBarLink-style">Man</p>
          {showManSubcategories && (
            <div className="flex flex-col pl-4">
              <NavLink
                to="/category/menTop"
                onClick={toggleMenu}
                className="sideNavBarLink-style"
              >
                Top
              </NavLink>
              <NavLink
                to="/category/menBottom"
                onClick={toggleMenu}
                className="sideNavBarLink-style"
              >
                Bottom
              </NavLink>
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => setShowWomenSubcategories(true)}
          onMouseLeave={() => setShowWomenSubcategories(false)}
        >
          <p className="font-montserrat my-3 hover:bg-gray-200 p-2 rounded text-gray-900 text-lg font-bold tracking-wider border-b-2">
            Women
          </p>
          {showWomenSubcategories && (
            <div className="flex flex-col pl-4">
              <NavLink
                to="/category/womenTop"
                onClick={toggleMenu}
                className="sideNavBarLink-style"
              >
                Top
              </NavLink>
              <NavLink
                to="/category/womenBottom"
                onClick={toggleMenu}
                className="sideNavBarLink-style"
              >
                Bottom
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          onClick={toggleMenu}
          to="/category/accessories"
          className="sideNavBarLink-style"
        >
          Accessories
        </NavLink>

        <NavLink
          onClick={toggleMenu}
          to="/contact"
          className="sideNavBarLink-style"
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
}

export default SideNavBar;
