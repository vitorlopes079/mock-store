import React, { useState, useEffect } from "react";
import {
  fetchAddress,
  updateAddress,
} from "../store/features/address/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";

const AdressForm = () => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address.address);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(fetchAddress(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (address) {
      setAddressLine1(address.addressLine1);
      setAddressLine2(address.addressLine2);
      setPostcode(address.postcode);
      setCity(address.city);
    }
  }, [address]);

  function handleAddressLine1Change(event) {
    setAddressLine1(event.target.value);
  }

  function handleAddressLine2Change(event) {
    setAddressLine2(event.target.value);
  }

  function handlePostcodeChange(event) {
    setPostcode(event.target.value);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    if (userId) {
      const newAddress = {
        addressLine1,
        addressLine2,
        postcode,
        city,
      };
      dispatch(updateAddress({ userId, newAddress }))
        .unwrap()
        .then(() => {
          setSuccessMessage("Your address has been successfully updated!");
        })
        .catch((error) => {
          console.error("Failed to update address:", error);
          setErrorMessage("Failed to update address. Please try again.");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Address Line 1 Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="addressLine1"
          value={addressLine1}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          onChange={handleAddressLine1Change}
        />
        <label
          htmlFor="addressLine1"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address Line 1
        </label>
      </div>

      {/* Address Line 2 Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="addressLine2"
          value={addressLine2}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={handleAddressLine2Change}
        />
        <label
          htmlFor="addressLine2"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address Line 2
        </label>
      </div>

      {/* Postcode Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="postcode"
          value={postcode}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={handlePostcodeChange}
        />
        <label
          htmlFor="postcode"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Postcode
        </label>
      </div>

      {/* City Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="city"
          value={city}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={handleCityChange}
        />
        <label
          htmlFor="city"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          City
        </label>

        <div>
          {successMessage && (
            <div className="text-blue-400 font-bold mt-2">✓ {successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-400 font-bold mt-2">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="text-red-400 underline font-bold my-6"
          >
            Update address
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdressForm;
