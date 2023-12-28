import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import SideNavBar from "./SideNavBar";
import Bag from "../store/features/bag/Bag";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Icons from "./Icons";
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
        <Logo handleLogoClick={handleLogoClick} />
        <Icons toggleBag={toggleBag} totalQuantity={totalQuantity} />
      </nav>

      <SideNavBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Bag toggleBag={toggleBag} />
    </>
  );
}

export default Header;
