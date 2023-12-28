import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Bag from "../store/features/bag/Bag";
import Logo from "./Logo";
import Icons from "./Icons";

function HeaderDesktop({ toggleBag }) {
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
      <nav className="relative h-16 w-full px-5 bg-black flex justify-between mr-4 items-center sticky top-0 z-10 ">
        <Logo handleLogoClick={handleLogoClick} />
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

        <Icons toggleBag={toggleBag} totalQuantity={totalQuantity} />
      </nav>

      <Bag toggleBag={toggleBag} />
    </>
  );
}

export default HeaderDesktop;
