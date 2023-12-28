import React from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  menTopSelectors,
  menBottomSelectors,
  womenTopSelectors,
  womenBottomSelectors,
} from "../store/features/products/productsSlice";
import { useSelector } from "react-redux";

function SubCategories() {
  const { subCategory } = useParams();

  const selectProductImageById = (adapterSelectors, state, id) => {
    const allItems = adapterSelectors.selectAll(state);
    const foundItem = allItems.find((item) => item.id === id);
    return foundItem ? foundItem.image : null;
  };

  const menTopImage = useSelector((state) =>
    selectProductImageById(menTopSelectors, state, 4)
  );
  const menBottomImage = useSelector((state) =>
    selectProductImageById(menBottomSelectors, state, 31)
  );
  const womenTopImage = useSelector((state) =>
    selectProductImageById(womenTopSelectors, state, 34)
  );
  const womenBottomImage = useSelector((state) =>
    selectProductImageById(womenBottomSelectors, state, 54)
  );

  return (
    <div className="flex">
      <div className="image-container h-96 md:w-72 mx-5 relative">
        <NavLink to={`/category/${subCategory}Top`}>
          <img
            className="opacity-75"
            src={subCategory === "men" ? menTopImage : womenTopImage}
            alt={subCategory === "men" ? "men top" : "women top"}
          />
          <div className="overlay-text absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="font-pacifico text-black text-5xl font-extrabold ">
              {subCategory} top
            </p>
          </div>
        </NavLink>
      </div>

      <div className="image-container h-96 md:w-72 mx-5 relative">
        <NavLink to={`/category/${subCategory}Bottom`}>
          <img
            className="opacity-75"
            src={subCategory === "men" ? menBottomImage : womenBottomImage}
            alt={subCategory === "men" ? "mae bottom" : "women bottom"}
          />
          <div className="overlay-text absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="font-pacifico text-black text-5xl font-extrabold ">
              {subCategory} bottom
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default SubCategories;
