import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import SideNavBar from "./SideNavBar";
import Bag from "../pages/bag/Bag";
import { useNavigate } from "react-router-dom";

function Header({ toggleBag, toggleMenu, isMenuOpen }) {
  const navigate = useNavigate();
  const bagItems = useSelector((state) => state.bag.items);

  const totalQuantity = bagItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="h-16 w-full px-5 bg-black flex justify-between items-center sticky top-0 z-10">
        <FontAwesomeIcon
          icon={faBars}
          className="text-gray-100 text-xl cursor-pointer"
          onClick={toggleMenu}
        />
        <h2
          onClick={handleLogoClick}
          className="font-montserrat font-bold text-xl text-gray-100 tracking-wide uppercase shadow-xs cursor-pointer"
        >
          Haute Couture
        </h2>
        <div className="relative">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-gray-100 text-2xl cursor-pointer"
            onClick={toggleBag}
          />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {totalQuantity}
            </span>
          )}
        </div>
      </nav>

      <SideNavBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Bag toggleBag={toggleBag} />
    </>
  );
}

export default Header;
