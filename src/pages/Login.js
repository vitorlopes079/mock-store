import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({email, password}));
    
  };

  useEffect(() => {
    if (authState.user) {
      navigate("/user"); // Replace with your target path
    }
  }, [authState.user, navigate]);

  return (
    <div className="mx-auto my-4 w-2/4 lg:w-1/4 ">
      <h1 className="font-josefin text-4xl text-gray-900 font-bold py-5  text-center">
        Login
      </h1>
      <p className="font-nunito text-gray-900 mb-4 text-center">
        Please enter your e-mail and password:
      </p>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email:
          </label>
        </div>

        {/* Password Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password:
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-6 py-1 transition ease-in duration-200  w-full rounded-lg hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
        >
          Login
        </button>
      </form>
      <p className="font-nunito text-gray-800 mt-2 mb-4 italic text-center">
        Don't have an account?{" "}
        <Link to="/login/newAccount">
          <span>Create one</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
