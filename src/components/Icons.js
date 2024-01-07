import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Icons = ({ toggleBag, totalQuantity }) => {
  return (
    <div className="relative  md:mr-0">
      <Link to="login">
        <FontAwesomeIcon
          icon={faUser}
          className="text-gray-100 text-xl  sm:text-2xl cursor-pointer mr-2 md:mr-5"
        />
      </Link>

      <FontAwesomeIcon
        icon={faBagShopping}
        className="text-gray-100 text-xl sm:text-2xl cursor-pointer"
        onClick={toggleBag}
      />

      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 md:bg-red-400 md:text-black-400">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default Icons;
