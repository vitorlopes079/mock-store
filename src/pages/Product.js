import React, { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import {
  menTopSelectors,
  menBottomSelectors,
  womenTopSelectors,
  womenBottomSelectors,
  accessoriesSelectors,
} from "../store/features/products/productsSlice";
import { useDispatch } from "react-redux";
import { addItem } from "../store/features/bag/bagSlice";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";

function Product() {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id, categoryName } = useParams();
  const dispatch = useDispatch();
  const { toggleBag } = useOutletContext();

  
  const product = useSelector((state) => {
    switch (categoryName) {
      case "menTop":
        return menTopSelectors.selectById(state, id);
      case "menBottom":
        return menBottomSelectors.selectById(state, id);
      case "womenTop":
        return womenTopSelectors.selectById(state, id);
      case "womenBottom":
        return womenBottomSelectors.selectById(state, id);
      case "accessories":
        return accessoriesSelectors.selectById(state, id);
      default:
        return null;
    }
  });


  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  if (!product) {
    // If product is not found, return a message or handle as needed
    return <NotFound />
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
      image: product.image,
      name: product.title,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      id: product.id
    };
    dispatch(addItem(itemToAdd));
    setQuantity(1);
    toggleBag();
  };

  return (
    <div className="flex flex-col md:flex-row justify-center w-64 my-8 md:w-5/6">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={`${product.title} in category ${categoryName}`}
          className="h-72 w-54 md:h-96 md:w-72"
        />
      </div>

      <div className="flex flex-col justify-center item-center mt-0 md:ml-10 md:w-72">
        <h1 className="h1-style-2 text-base py-1 pt-4  md:text-2xl md:py-0 md:pb-2">
          {product.title}
        </h1>
        <p className="font-nunito text-sm  tracking-wide text-gray-900 italic">
          {product.description}
        </p>

        <div>
          <p className="font-nunito px-3 pt-4 pb-2 mb-2 text-gray-900 md:pt-2 md:pb-1">
            <span className="font-bold">size:</span> {selectedSize}
          </p>
          <div className="flex justify-center space-x-2 my-1">
            {sizes.map((size) => (
              <button
                key={size}
                className={`font-nunito text-gray-700 px-3 py-1 border-2 rounded-full text-xs ${
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

        <div className="flex my-2 p-1">
          <p className="font-nunito font-bold text-blue-700 py-1 px-2 mr-8">
            {product.price}
          </p>
          <div className="flex items-center border rounded-lg mr-8">
            <button
              className="px-3 py-1 text-gray-700 border-r"
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="font-nunito text-sm px-3 py-1 text-gray-700">
              {quantity}
            </span>
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
          className={`mt-2 px-6 py-2 transition ease-in duration-200 uppercase rounded-lg hover:bg-gray-800 hover:text-red-400 border-2 border-gray-900 focus:outline-none ${
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
