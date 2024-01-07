import React from "react";

const ProductOrder = ({ key, image, name, price, quantity, size }) => {

  const priceNumber = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  const totalPrice = priceNumber * quantity

  return (
    <div className="flex my-6">
      <div className=" ">
        <img src={image} alt="test" className="h-36" />
      </div>
      <div className="h-36 mx-4 flex flex-col w-32 md:w-auto">
        <h1 className="text-gray-900 font-bold md:p-1">{name}</h1>
        <p className="text-sm text-gray-500 pt-1 md:p-1">
          <span className="font-bold">Size:</span> {size}
        </p>

        <p className="text-xs font-bold pb-1 md:p-1">Quantity: {quantity}</p>
        <p className="text-red-400 font-bold p-1"> ${totalPrice}</p>
      </div>
    </div>
  );
};

export default ProductOrder;
