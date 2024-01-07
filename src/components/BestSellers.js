import React from "react";
import ItemContainer from "./ItemContainer";
import { useSelector } from "react-redux";
import {
  menTopSelectors,
  menBottomSelectors,
  womenTopSelectors,
  womenBottomSelectors,
  accessoriesSelectors,
} from "../store/features/products/productsSlice";
import { shuffleArray } from "../utilities/suffleFunction";

const BestSellers = () => {
  const menTop = useSelector(menTopSelectors.selectAll);
  const menBottom = useSelector(menBottomSelectors.selectAll);
  const womenTop = useSelector(womenTopSelectors.selectAll);
  const womenBottom = useSelector(womenBottomSelectors.selectAll);
  const accessories = useSelector(accessoriesSelectors.selectAll);

  const combinedProducts = [
    ...menTop,
    ...menBottom,
    ...womenTop,
    ...womenBottom,
    ...accessories,
  ];

  const ourBestSellers = shuffleArray(combinedProducts).slice(0, 6);

  return (
    <div>
      <div className="mt-20">
        <h2 className="h1-style-1 mt-8 ">
          Our Best Sellers
        </h2>
        <div className="flex justify-center">
          <div
            className="flex justify-around flex-wrap my-6 "
            style={{ maxWidth: "694px" }}
          >
            {ourBestSellers.map((item) => (
              <ItemContainer
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                category={item.category}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
