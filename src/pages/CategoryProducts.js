import React from "react";
import { useParams } from "react-router-dom";
import ItemContainer from "../components/ItemContainer";
import {
  menTopSelectors,
  menBottomSelectors,
  womenTopSelectors,
  womenBottomSelectors,
  accessoriesSelectors,
} from "../store/features/products/productsSlice";
import { useSelector } from "react-redux";

function CategoryProducts() {
  const { categoryName } = useParams();
  const menTop = useSelector(menTopSelectors.selectAll);
  const menBottom = useSelector(menBottomSelectors.selectAll);
  const womenTop = useSelector(womenTopSelectors.selectAll);
  const womenBottom = useSelector(womenBottomSelectors.selectAll);
  const accessories = useSelector(accessoriesSelectors.selectAll);

  let productArray;
  let text;

  if (categoryName === "menTop") {
    productArray = menTop;
    text = "Haute Couture for Men";
  } else if (categoryName === "menBottom") {
    productArray = menBottom;
    text = "Haute Couture for Men";
  } else if (categoryName === "womenTop") {
    productArray = womenTop;
    text = "Haute Couture for Women";
  } else if (categoryName === "womenBottom") {
    productArray = womenBottom;
    text = "Haute Couture for Women";
  } else if (categoryName === "accessories") {
    productArray = accessories;
    text = "Haute Couture's accessories";
  }

  return (
    <>
      <div>
        <h1 className="h1-style-1 mt-10 tracking-wide">
          {text}
        </h1>
      </div>
      <div className="flex justify-center">
        <div
          className="flex justify-around flex-wrap  custom-width-style"
          style={{ maxWidth: "740px" }}
        >
          {productArray &&
            productArray.map((element) => (
              <ItemContainer
                key={element.id}
                id={element.id}
                title={element.title}
                price={element.price}
                category={categoryName}
                description={element.description}
                image={element.image}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
