import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase";
import { setNewUser } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";

const NewAccountForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, surname, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return; // Stop the submission if passwords do not match
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional information in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        name: name,
        surname: surname,
        email: email,
        addressLine1: "",
        addressLine2: "",
        postcode: "",
        city: "",
      });

      dispatch(
        setNewUser({
          uid: user.uid,
          email: email,
          name: name,
          surname: surname,
        })
      );
      // Handle successful account creation (e.g., redirecting the user or showing a success message)
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(
          "The email address is already in use by another account."
        );
      } else {
        setErrorMessage(
          "An error occurred during account creation. Please try again."
        );
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="input-style peer"
          placeholder=" "
        />
        <label
          htmlFor="name"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Name
        </label>
      </div>

      {/* Surname Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          id="surname"
          {...register("name", { required: true })}
          className="input-style peer"
          placeholder=" "
        />
        <label
          htmlFor="surname"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Surname
        </label>
      </div>

      {/* Email Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="input-style peer"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Email:
        </label>
      </div>

      {/* Password Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="input-style peer"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Password:
        </label>
      </div>

      {/* Confirm Password Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", { required: true })}
          className="input-style peer"
          placeholder=" "
        />
        <label
          htmlFor="confirmPassword"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Confirm Password:
        </label>
      </div>

      {/* Display error message */}
      <div className="flex flex-col justify-start items-start">
        {errorMessage && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}

        {errors.name && (
          <span className="text-red-400 font-bold mt-2">
            Name field is required
          </span>
        )}
        {errors.surname && (
          <span className="text-red-400 font-bold mt-2">
            Surname field is required
          </span>
        )}
        {errors.email && (
          <span className="text-red-400 font-bold mt-2">
            Email field is required
          </span>
        )}
        {errors.password && (
          <span className="text-red-400 font-bold mt-2">
            Password field is required
          </span>
        )}
        {errors.confirmPassword && (
          <span className="text-red-400 font-bold mt-2">
            Confirm password field is required
          </span>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="my-4 px-6 py-1 transition ease-in duration-200 rounded-lg hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none "
        >
          Create account
        </button>
      </div>
    </form>
  );
};

export default NewAccountForm;
