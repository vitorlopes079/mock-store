import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import NewUserForm from "../components/NewUserForm";

const NewAccount = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth();

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
      })

      // Handle successful account creation (e.g., redirecting the user or showing a success message)
    } catch (error) {
      console.log(error.code)
      console.log(error.message)
      
    }
  };

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
    />
  );
};

export default NewAccount;
