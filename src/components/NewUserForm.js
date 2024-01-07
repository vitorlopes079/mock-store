import React from "react";

const NewUserForm = ({
  name,
  surname,
  email,
  password,
  confirmPassword,
  handleNameChange,
  handleSurnameChange,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
  handleSubmit,
  errorMessage,
}) => {
  return (
    <div className="mx-auto my-4 px-6 md:px-0 sm:w-2/4 lg:w-1/4 ">
      <h1 className=" h1-style-2 text-3xl py-4 text-center md:py-5 md:text-4xl">
        Create new account
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            id="name"
            value={name}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleNameChange}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        {/* Surname Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            id="surname"
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={surname}
            onChange={handleSurnameChange}
          />
          <label
            htmlFor="surname"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Surname
          </label>
        </div>

        {/* Email Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            id="email"
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleEmailChange}
            value={email}
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
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={password}
            onChange={handlePasswordChange}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password:
          </label>
        </div>

        {/* Confirm Password Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            id="confirmPassword"
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password:
          </label>
        </div>

        {/* Display error message */}
        {errorMessage && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="my-4 px-6 py-1 transition ease-in duration-200 rounded-lg hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none md:w-1/2"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
