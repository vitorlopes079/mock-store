import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import SideNavBar from "./SideNavBar";
import Bag from "../store/features/bag/Bag";
import { useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";

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
        <div className="relative">
          <Link to="login">
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-100 text-xl  cursor-pointer mr-2"
            />
          </Link>

          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-gray-100 text-xl cursor-pointer"
            onClick={toggleBag}
          />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 ">
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
