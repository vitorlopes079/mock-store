import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

const ChangePassword = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;
    setSuccessMessage("");
    setErrorMessage("");

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            setSuccessMessage("✓ Your password has been successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating password:", error);
            setErrorMessage("Error updating password. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Error reauthenticating:", error);
        setErrorMessage(
          "Current password is incorrect or other authentication error."
        );
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Current Password Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          {...register("currentPassword", { required: true })}
          className="input-style peer"
          placeholder=" "
        />

        <label
          htmlFor="currentPassword"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Current Password
        </label>
      </div>

      {/* New Password Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          {...register("newPassword", { required: true })}
          className="input-style peer"
          placeholder=" "
        />

        <label
          htmlFor="newPassword"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          New Password
        </label>
      </div>

      {/* Confirm New Password Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          {...register("confirmNewPassword", { required: true })}
          className="input-style peer"
          placeholder=" "
        />

        <label
          htmlFor="confirmNewPassword"
          className="label-style peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:font-medium"
        >
          Confirm New Password
        </label>
      </div>

      <div className="flex flex-col justify-start items-start">
        {/* Error and Success Messages */}
        {errorMessage && (
          <div className="text-red-400 font-bold mt-2">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-blue-400 font-bold mt-2">{successMessage}</div>
        )}
        {errors.currentPassword && (
          <span className="text-red-400 font-bold mt-2">
            Current password field is required
          </span>
        )}
        {errors.newPassword && (
          <span className="text-red-400 font-bold mt-2">
            New password field is required
          </span>
        )}
        {errors.confirmNewPassword && (
          <span className="text-red-400 font-bold mt-2">
            confirm new password field is required
          </span>
        )}
        <button
          type="submit"
          className="text-red-400 underline font-bold mt-2 mb-6"
        >
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
