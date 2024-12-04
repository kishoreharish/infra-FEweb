import React, { useState } from "react";
import "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Logging in with", email, password);
  };

  return (
    <div className="login">
      <h2 className="login__title">Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login__input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login__input"
        />
        <button type="submit" className="login__button">Login</button>
      </form>
    </div>
  );
};

export default Login;
