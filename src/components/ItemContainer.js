import React from "react";
import { Link } from "react-router-dom";

// Utility function for truncating text
const truncateDescription = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

function ItemContainer({ id, title, price, description, image, category }) {
  
  const productUrl = `/category/${category}/product/${id}`;
  const truncatedDescription = truncateDescription(description, 150);
  const truncatedTitle = truncateDescription(title, 40);

  return (
    <div className="min-h-96 w-44 mt-8 mb-12 flex flex-col items-center justify-center mx-auto">
      <Link to={productUrl}>
        <img
          src={image}
          alt={`${title} in category ${category}`}
          className="h-48 w-full my-6"
          loading="lazy"
        />
      </Link>

      <div className="font-poppins flex-grow p-3 flex flex-col justify-between">
        <Link to={productUrl} className="text-gray-700 font-bold h-12 overflow-hidden">
          {truncatedTitle}
        </Link>
        <p className="font-nunito text-gray-500 text-sm my-3 h-40 italic">
          {truncatedDescription}
        </p>
        <p className="text-gray-700 font-nunito">
          <span className="text-red-400 font-bold">Price:</span> {price}
        </p>
      </div>
    </div>
  );
}

export default ItemContainer;