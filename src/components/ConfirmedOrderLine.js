import React from "react";

const ConfirmedOrderLine = ({ date, products, totalPrice }) => {
  const eachProduct = products.map((product) => (
    <p className="font-nunito text-gray-900 text-sm sm:text-base">
      <span className="h1-style-2 text-sm sm:text-base ">{product.quantity}x </span> {product.name}
    </p>
  ));

  return (
    <div className="border border-gray-200 p-4 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="font-nunito text-gray-900">
          <span className="font-poppins font-bold text-gray-900 sm:text-lg ">Ordered at:</span> {date}
        </h2>
        <p className="italic font-nunito text-gray-900 text-sm sm:text-base">Order on the way </p>
      </div>

      <div className="p-2">
       {eachProduct}
      </div>

      <p className="font-nunito text-gray-900 text-sm sm:text-base mt-3">
        <span className="font-poppins sm:text-lg text-blue-500 font-bold">Total price:</span>{" "}
        ${totalPrice}
      </p>
    </div>
  );
};

export default ConfirmedOrderLine;
