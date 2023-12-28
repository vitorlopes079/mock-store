import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import Bag from "../store/features/bag/Bag";
import Logo from "./Logo";

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

        <div className="relative mr-4">
          <Link to="login">
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-100 text-2xl cursor-pointer mr-5"
            />
          </Link>

          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-gray-100 text-2xl cursor-pointer "
            onClick={toggleBag}
          />

          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-400 text-black-400 text-xs rounded-full px-1.5 py-0.5">
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
