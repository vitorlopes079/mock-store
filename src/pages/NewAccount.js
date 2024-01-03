import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import NewUserForm from "../components/NewUserForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNewUser } from "../store/features/auth/authSlice";

const NewAccount = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  useEffect(() => {
    if (authState.user) {
      navigate("/user");
    }
  }, [authState.user, navigate]);

  return (
    <NewUserForm
      name={name}
      surname={surname}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      handleNameChange={handleNameChange}
      handleSurnameChange={handleSurnameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleConfirmPasswordChange={handleConfirmPasswordChange}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
};

export default NewAccount;
