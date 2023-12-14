import React from "react";

import { useParams, NavLink } from "react-router-dom";
import { products } from "../products";

function SubCategories() {
  const { subcategories } = useParams();

  const manTop = products.man.top.find((product) => product.id === 4);
  const manBottom = products.man.bottom.find((product) => product.id === 31);
  const womenTop = products.women.top.find((product) => product.id === 34);
  const womenBottom = products.women.bottom.find(
    (product) => product.id === 54
  );

  return (
    <div className="flex">
      <div className="image-container h-96 md:w-72 mx-5 relative">
        <NavLink to={`/category/${subcategories}-top`}>
          <img
            className="opacity-75"
            src={subcategories === "man" ? manTop.image : womenTop.image}
            alt={subcategories === "man" ? manTop.title : womenTop.title}
          />
          <div className="overlay-text absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="font-montserrat text-gray-900 text-xl font-extrabold uppercase">
              {subcategories} top
            </p>
          </div>
        </NavLink>
      </div>

      <div className="image-container h-96 md:w-72 mx-5 relative">
        <NavLink to={`/category/${subcategories}-bottom`}>
          <img
            className="opacity-75"
            src={subcategories === "man" ? manBottom.image : womenBottom.image}
            alt={subcategories === "man" ? manBottom.title : womenBottom.title}
          />
          <div className="overlay-text absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="font-montserrat text-gray-900 text-xl font-extrabold uppercase">
              {subcategories} bottom
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default SubCategories;
