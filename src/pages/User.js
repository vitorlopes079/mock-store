import React from "react";
import { logout } from "../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdressForm from "../components/AdressForm";
import ChangePassword from "./ChangePassword";

const User = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout(authState));
    if (!authState.user) {
      navigate("/");
    }
  }

  return (
    <div className="w-3/6 h-full flex flex-col items-start justify-start">
      <div className="py-4">
        <h1 className="font-poppins text-3xl text-gray-900 font-bold pt-4 mt-6 ">
          My orders
        </h1>

        <p className="text-lg text-red-400 p-2">you have no orders at the moment</p>
      </div>
      <div className="w-full">
        <h1 className="font-poppins text-3xl text-gray-900 font-bold py-4">
          My adress
        </h1>
        <AdressForm />
      </div>
      <div className="w-full">
        <h1 className="font-poppins text-3xl text-gray-900 font-bold py-4">
          Change password{" "}
        </h1>
        <ChangePassword />
      </div>
      <div className="absolute right-8 top-20">
        <p
          onClick={() => handleLogout()}
          className=" text-lg text-red-400 font-bold cursor-pointer"
        >
          Log Out
        </p>
      </div>
    </div>
  );
};

export default User;
