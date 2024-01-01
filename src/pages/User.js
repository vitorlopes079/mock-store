import React from "react";
import { logout } from "../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  console.log(authState);
  console.log(authState.user.name);
  const userName = authState.user.name;
  console.log(userName);

  return (
    <div className="">
      <h1 className="font-josefin text-3xl text-gray-900 font-bold py-5 text-center">  
        Hi {userName} </h1>
        <p className="font-nunito text-gray-900 text-justify mb-4 md:tracking-wide text-center">thank you for visiting, this page and the authenticaion
        features is under maintance</p>
   
      <p onClick={() => handleLogout()}
      className="absolute right-8 top-20 text-lg text-red-400 font-bold cursor-pointer" >Log Out</p>
    </div>
  );
};

export default User;
