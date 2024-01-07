import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Logo from "../components/Logo";

const OrderConfirmation = () => {
  const [numberOfPieces, setNumberOfPieces] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Stop generating new pieces after a certain time
      setNumberOfPieces(0);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-1/2 ">
      <Confetti numberOfPieces={numberOfPieces} />
    
      <h1 className="h1-style-2">
        Your order has been successfully completed
        <span className="text-green-500 text-4xl lg:text-5xl"> ✔</span>
      </h1>
      <p className="font-nunito text-gray-900 text-lg my-4">
        You can see all your orders on the user's page. Please note, since we're
        a mock store, there's no need for real payments or deliveries. Enjoy
        browsing and ordering hassle-free!
      </p>
    </div>
  );
};

export default OrderConfirmation;
