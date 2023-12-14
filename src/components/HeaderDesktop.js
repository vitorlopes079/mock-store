import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Bag from "../pages/bag/Bag";

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
      <nav className="h-16 w-full px-5 bg-black flex justify-between mr-4 items-center sticky top-0 z-10 ">
        <div className="w-6 whitespace-nowrap">
          <h2
            onClick={handleLogoClick}
            className="font-roboto font-bold text-xl text-gray-100 tracking-wide uppercase shadow-xs cursor-pointer ml-4 whitespace-nowrap"
          >
            Haute Couture
          </h2>
        </div>

        <div className="pr-22 w-8/10 flex items-center">
          <NavLink
            className="font-montserrat mx-1 text-gray-100  w-32 py-2 hover:bg-gray-700 hover:text-white rounded transition duration-300 uppercase text-center"
            activeClassName="bg-gray-700"
            to="/"
          >
            Home Page
          </NavLink>
          <NavLink
            className="font-montserrat mx-1 text-gray-100 w-16 py-2 hover:bg-gray-700 hover:text-white rounded transition duration-300 uppercase text-center"
            activeClassName="bg-gray-700"
            to="/subcategories/man"
          >
            Man
          </NavLink>
          <NavLink
            className="font-montserrat mx-1 text-gray-100  w-24 py-2 hover:bg-gray-700 hover:text-white rounded transition duration-300 uppercase text-center"
            activeClassName="bg-gray-700"
            to="/subcategories/women"
          >
            Women
          </NavLink>
          <NavLink
            className="font-montserrat mx-1 text-gray-100  w-36 py-2 hover:bg-gray-700 hover:text-white rounded transition duration-300 uppercase text-center"
            activeClassName="bg-gray-700"
            to="/category/accessories"
          >
            Accessories
          </NavLink>
          <NavLink
            className="font-montserrat mx-1 text-gray-100  py-2 w-24 hover:bg-gray-700 hover:text-white rounded transition duration-300 uppercase text-center"
            activeClassName="bg-gray-700"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>

        <div className="relative mr-4">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-gray-100 text-2xl cursor-pointer "
            onClick={toggleBag}
          />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {totalQuantity}
            </span>
          )}
        </div>
      </nav>

      <Bag toggleBag={toggleBag} />
    </>
  );
}

export default HeaderDesktop;
