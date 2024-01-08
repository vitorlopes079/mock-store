import React, { useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function handlePasswordChange(e) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setSuccessMessage(null)
      setErrorMessage("Passwords do not match!");
      
      return;
    }

    // Assume additional validations are added here

    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email, // Assuming the email is available in the user object
      currentPassword
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated, now update the password
        updatePassword(user, newPassword)
          .then(() => {
            setErrorMessage(null)
            setSuccessMessage("✓ Your password has been successfully updated!");
            // Reset password fields or additional logic after successful update
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
          })
          .catch((error) => {
            // Handle errors from password update
            console.error("Error updating password:", error);
            setSuccessMessage(null)
            setErrorMessage("Error updating password. Please try again.");
          });
      })
      .catch((error) => {
        // Handle errors from reauthentication
        console.error("Error reauthenticating:", error);
        setSuccessMessage(null)
        setErrorMessage(
          "Current password is incorrect or other authentication error."
        );
      });
  }

  return (
    <form onSubmit={handlePasswordChange}>
      {/* Current Password Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="input-style peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="currentPassword"
          className="label-style peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  "
        >
          Current Password
        </label>
      </div>
      {/* New Password Field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-style peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="newPassword"
          className="label-style peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          New Password
        </label>
      </div>
      {/* Confirm New Password Field */}
      <div className="relative z-0 w-full  group">
        <input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="input-style peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="confirmNewPassword"
          className="label-style peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
        >
          Confirm New Password
        </label>
      </div>
      <div>
        {errorMessage && (
          <div className="text-red-400 font-bold mt-2">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-blue-400 font-bold mt-2">{successMessage}</div>
        )}
        <button type="submit" className="text-red-400 underline font-bold my-6">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
