import React from "react";
import ProductOrder from "./ProductOrder";
import AdressForm from "../components/AdressForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewOrder } from "../store/features/orders/ordersSlice";
import { auth } from "../firebase";
import { removeAllTheItems } from "../store/features/bag/bagSlice";

const ConfirmOrder = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userId = auth.currentUser?.uid;
  const now = new Date();
  const formattedDate = `${
    now.getMonth() + 1
  }/${now.getDate()}/${now.getFullYear()}`; // Format: MM/DD/YYYY

  console.log("total", orderData.totalPrice);
  console.log("orderdata", orderData);

  const handleClick = () => {
    const order = {
      userId: userId,
      date: formattedDate,
      totalPrice: orderData.totalPrice.toFixed(2),
      products: orderData.products.map((item) => ({
        id: item.id,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      })),
    };

    dispatch(addNewOrder(order));
    dispatch(removeAllTheItems());
    navigate("/orderConfirmation")
  };

 

  const productOrder = orderData ? (
    orderData.products.map((item) => (
      <ProductOrder
        key={item.id}
        image={item.image}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        size={item.size}
      />
    ))
  ) : (
    <p>Loading order...</p>
  );

  return (
    <div className="w-4/5 md:w-3/5 lg:w-3/6 mt-8">
      <h1 className="h1-style-2 mb-2">
        Confirm your order
      </h1>
      <div className="p-2">{productOrder}</div>

      <div>
        <h1 className="h1-style-2 my-8 text-xl">
          Confirm your Address
        </h1>
        <AdressForm />
      </div>
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={handleClick}
          className="my-4 px-6 py-1 transition ease-in duration-200   md:w-48 rounded-lg hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
        >
          Place Order
        </button>
        {orderData && (
          <p className="font-poppins text-blue-600 font-bold text-sm sm:text-base lg:text-xl ">
            Total Price:{" "}
            <span className="text-black">${orderData.totalPrice.toFixed(2)}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrder;
