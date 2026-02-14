import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
   const[loading,setLoading]=useState(false)

  const navigate = useNavigate();

  const LoginUser = async () => {
    setLoading(true);
    try {
      const responce = await axios.post(
        "https://notes-backend-code.onrender.com/api/auth/login",
        { email: email, password: password },
        { withCredentials: true },
      );
      setMessage(responce.data.message);
      console.log(responce);
      console.log(email.password);

      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/note"), 300);
    } catch (error) {
      setMessage("Login failed");
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
      <h1 style={{ color: "#fade26" }}>Login Now</h1>
      <h4 style={{ color: "red" }}>{message}</h4>
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
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
        }}
      />
      <button
        onClick={LoginUser}
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
          backgroundColor: "#fade26",
        }}
      >
       {loading ? <h3>Loading....</h3> : <h3>Login</h3>}
      </button>
      <h3 style={{ color: "#fff" }}>
        I don't have account?{" "}
        <Link to="/register" style={{ color: "#fade26" }}>
          Register
        </Link>
      </h3>
    </div>
  );
};

export default Login;
