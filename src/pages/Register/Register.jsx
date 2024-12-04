import React, { useState } from "react";
import "./Register.module.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add register logic here
    console.log("Registering with", name, email, password);
  };

  return (
    <div className="register">
      <h2 className="register__title">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register__input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register__input"
        />
        <button type="submit" className="register__button">Register</button>
      </form>
    </div>
  );
};

export default Register;
