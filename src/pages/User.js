import React, { useEffect } from "react";
import { logOutUser } from "../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../store/features/orders/ordersSlice";
import AdressForm from "../components/AdressForm";
import ChangePassword from "../components/ChangePassword";
import { auth } from "../firebase";
import MyOrders from "../components/MyOrders";

const User = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchOrders(userId));
  }, [dispatch, userId]);

  function handleLogout() {
    dispatch(logOutUser());
    if (!authState.user) {
      navigate("/");
    }
  }

  return (
    <div className=" h-full flex flex-col items-start justify-start sm:w-3/6">
      <div className="py-4 w-full">
        <h1 className="h1-style-2 pt-2 mt-6 md:text-3xl ">
          My orders
        </h1>
        <MyOrders />
      </div>
      <div className="w-full">
        <h1 className="h1-style-2 py-2 mb-4">
          My adress
        </h1>
        <AdressForm />
      </div>
      <div className="w-full">
        <h1 className="h1-style-2 py-2 mb-4">
          Change password{" "}
        </h1>
        <ChangePassword />
      </div>
      <div className="absolute right-8 top-20">
        <p
          onClick={() => handleLogout()}
          className="  text-red-400 font-bold cursor-pointer sm:text-lg"
        >
          Log Out
        </p>
      </div>
    </div>
  );
};

export default User;
