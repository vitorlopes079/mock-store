import React, { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { products } from "../products";
import { useDispatch } from "react-redux";
import { addItem } from "./bag/bagSlice";

function Product() {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id, categoryName } = useParams();
  const dispatch = useDispatch();
  const { toggleBag } = useOutletContext();

  const categoryParts = categoryName.includes("-")
    ? categoryName.split("-")
    : [categoryName];
  const mainCategory = categoryParts[0];
  const subCategory = categoryParts.length > 1 ? categoryParts[1] : null;
  const productArray = subCategory
    ? products[mainCategory][subCategory]
    : products[mainCategory];
  const path = productArray.find((product) => product.id === parseInt(id));
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  if (!path) {
    // If product is not found, return a message or handle as needed
    return <p>Product not found.</p>;
  }

  // Function to handle incrementing the quantity
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to handle decrementing the quantity
  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToBag = () => {
    const itemToAdd = {
      image: path.image,
      name: path.title,
      price: path.price,
      quantity: quantity,
      size: selectedSize,
    };
    dispatch(addItem(itemToAdd));
    setQuantity(1);
    toggleBag();
  };

  return (
    <div className="flex flex-col md:flex-row justify-center w-64 my-8 md:w-5/6">
      <div className="flex justify-center">
        <img src={path.image} alt={`${path.title} in category ${categoryName}`} className="h-72 w-54 md:h-96 md:w-72" />
      </div>

      <div className="flex flex-col justify-center item-center mt-0 md:ml-8 md:w-72">
        <h1 className="font-josefin text-xl font-bold text-gray-900 py-2 pt-4 px-3 md:text-2xl md:py-0 md:pb-2">
          {path.title}
        </h1>
        <p className="font-nunito text-sm px-2 tracking-wide text-gray-900">
          {path.description}
        </p>

        <div>
          <p className="font-nunito px-3 pt-4 pb-2 mb-3 text-gray-900 md:pt-2 md:pb-1">
            <span className="font-bold">size:</span> {selectedSize}
          </p>
          <div className="flex justify-center space-x-2 mb-4 ">
            {sizes.map((size) => (
              <button
                key={size}
                className={`font-nunito text-gray-700 px-3 py-1 border-2 rounded-full text-sm ${
                  selectedSize === size
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-around my-4 p-1">
          <p className="font-nunito font-bold text-blue-700 py-1 px-2">{path.price}</p>
          <div className="flex items-center border rounded-lg mr-8">
            <button
              className="px-3 py-1 text-gray-700 border-r"
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="font-nunito px-3 py-1 text-gray-700">{quantity}</span>
            <button
              className="font-nunito px-3 py-1 text-gray-700 border-l"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToBag}
          className={`mt-4 px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none ${
            selectedSize ? "" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!selectedSize}
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}

export default Product;
