import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Backend_URL from "../config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const RegisterUser = async () => {
    setLoading(true);
    try {
      const responce = await axios.post(
        `${Backend_URL}/api/auth/register`,
        { username: username, email: email, password: password },
        { withCredentials: true },
      );

      setMessage(responce.data.message);
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/note"), 300);
    } catch (error) {
      setMessage("registration failed");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#fade26" }}>Register Now</h1>
      <h4 style={{ color: "red" }}>{message}</h4>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
        }}
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        security=""
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
        }}
      />
      <button
        onClick={RegisterUser}
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
          backgroundColor: "#fade26",
        }}
      >
        {loading ? <h3>Loading....</h3> : <h3>Register</h3>}
      </button>
      <h3 style={{ color: "#fff" }}>
        I have account?{" "}
        <Link to="/login" style={{ color: "#fade26" }}>
          login
        </Link>
      </h3>
    </div>
  );
};

export default Register;
