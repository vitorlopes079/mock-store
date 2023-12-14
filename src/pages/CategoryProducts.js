import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../products";
import ItemContainer from "../components/ItemContainer";

function CategoryProducts() {
  let { categoryName } = useParams();

  // Check if the category name includes a subcategory
  const categoryParts = categoryName.split("-");
  const mainCategory = categoryParts[0];
  const subCategory = categoryParts[1];

  // Determine the correct product array to map over
  // If there's no subcategory, it will default to the main category
  const productArray = subCategory
    ? products[mainCategory]?.[subCategory]
    : products[mainCategory];
  const text = subCategory
    ? `Haute Couture for ${mainCategory}`
    : "Haute Couture Accessories";

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mt-12 uppercase tracking-wide">
          {text}
        </h1>
      </div>
      <div className="flex justify-center">
        <div
          className="flex justify-around flex-wrap my-6 custom-width-style"
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
