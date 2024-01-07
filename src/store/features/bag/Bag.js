import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { incrementQuantity, decrementQuantity, removeItem } from "./bagSlice";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

function Bag({ isBagOpen, toggleBag }) {
  const items = useSelector((state) => state.bag.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = useSelector((state) => state.bag.totalAmount);
  const userId = auth.currentUser?.uid;

  const bagStyle = {
    position: "fixed",
    top: 0,
    right: isBagOpen ? 0 : "-150%",
    width: "350px",
    height: "100%",
    backgroundColor: "#edf2f7",
    transition: "right 0.3s ease-in-out",
    zIndex: 100,
  };

  function handleClick() {
    const totalPrice = totalAmount;
    const orderData = {
      totalPrice: totalPrice,
      userId,
      products: items.map((item) => ({
        id: item.id,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      })),
    };

    toggleBag();
    navigate("/confirmOrder", { state: { orderData } });
  }

  return (
    <div
      style={bagStyle}
      className="bg-gray-500 custom-scrollbar overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-10 mx-4 ">
        <p className="font-josefin text-2xl p-5 font-bold text-gray-600 tracking-wide">
          Bag
        </p>
        <FontAwesomeIcon
          icon={faTimes}
          className="text-2xl mr-5 cursor-pointer text-gray-900"
          onClick={toggleBag}
        />
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-josefin text-xl font-bold text-red-400 w-5/6 underline">
            Your bag is currently empty.
          </p>
          <p className="font-nunito text-lg text-gray-600 mt-4 w-5/6">
            It looks like you haven't made your choice yet. Our collection
            awaits you - find something amazing and fill your bag with style!
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {items.map((item, index) => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            const total = item.quantity * price;

            return (
              <div
                key={index}
                className="flex justify-center items-center w-72 mx-2 my-2"
              >
                <img src={item.image} alt={item.name} className="h-36" />
                <div className="h-36 mx-4 flex flex-col justify-between ">
                  <h1 className="text-gray-900 font-bold">{item.name}</h1>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Size:</span> {item.size}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center border rounded-lg w-24">
                      <button
                        className="px-3 py-1 text-gray-700 text-sm border-r"
                        onClick={() =>
                          dispatch(
                            decrementQuantity({
                              name: item.name,
                              size: item.size,
                            })
                          )
                        }
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-700 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-700 border-l text-sm"
                        onClick={() =>
                          dispatch(
                            incrementQuantity({
                              name: item.name,
                              size: item.size,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs font-bold text-blue-700">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                  <p
                    onClick={() =>
                      dispatch(removeItem({ name: item.name, size: item.size }))
                    }
                    className="text-sm text-red-600 underline hover:text-red-800 cursor-pointer"
                  >
                    Remove
                  </p>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center items-center p-4">
            <button
              onClick={handleClick}
              href="#_"
              className="relative px-5 py-2 overflow-hidden font-medium text-gray-900 bg-gray-300 border border-gray-100 rounded-lg shadow-inner group w-64 mt-5"
            >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                Place Order - ${totalAmount.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bag;
