import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddress,
  updateAddress,
} from "../store/features/address/addressSlice";
import { auth } from "../firebase";

const AddressForm = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address.address);
  const userId = auth.currentUser?.uid;

  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // State for success and error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch address effect
  useEffect(() => {
    dispatch(fetchAddress(userId));
  }, [dispatch, userId]);

  // Reset form fields when address is fetched
  useEffect(() => {
    if (address) {
      reset(address);
    }
  }, [address, reset]);

  // Submit handler
  const onSubmit = async (data) => {
    setSuccessMessage("");
    setErrorMessage("");
    if (userId) {
      dispatch(updateAddress({ userId, newAddress: data }))
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Address Line 1 Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          {...register("addressLine1", { required: true })}
          className="input-style peer"
          placeholder=" "
        />

        <label className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium">
          Address Line 1
        </label>
      </div>

      {/* Address Line 2 Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          {...register("addressLine2")}
          className="input-style peer"
          placeholder=" "
        />
        <label className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium">
          Address Line 2
        </label>
      </div>

      {/* Postcode Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          {...register("postcode", { required: true })}
          className="input-style peer"
          placeholder=" "
        />

        <label className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium">
          Postcode
        </label>
      </div>

      {/* City Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          {...register("city", { required: true })}
          className="input-style peer"
          placeholder=" "
        />

        <label className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium">
          City
        </label>
      </div>
      <div className="flex flex-col justify-start items-start">
        {/* Success and Error Messages */}
        {successMessage && (
          <div className="text-blue-400 font-bold mt-2">✓ {successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-400 font-bold mt-2">{errorMessage}</div>
        )}
        {errors.addressLine1 && (
          <span className="text-red-400 font-bold mt-2">
            Address field is required
          </span>
        )}
        {errors.postcode && (
          <span className="text-red-400 font-bold mt-2">
            {" "}
            Postcode field is required
          </span>
        )}
        {errors.city && (
          <span className="text-red-400 font-bold mt-2">
            City field is required
          </span>
        )}

        <button
          type="submit"
          className="text-red-400 underline font-bold mt-2 mb-6"
        >
          Update address
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
