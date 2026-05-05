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
      const response = await axios.post(
        `${Backend_URL}/api/auth/register`,
        { username: username, email: email, password: password },
        { withCredentials: true },
      );

      setMessage(response.data.message);
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/note"), 300);
    } catch (error) {
      setMessage("Registration failed");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated background shapes */}
      <div style={{
        position: "absolute",
        top: "-10%",
        right: "-5%",
        width: "300px",
        height: "300px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        animation: "float 20s infinite ease-in-out",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "-5%",
        width: "400px",
        height: "400px",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "50%",
        animation: "float 15s infinite ease-in-out reverse",
      }} />

      {/* Main card */}
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "30px",
        padding: "40px",
        width: "450px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        animation: "fadeInUp 0.6s ease-out",
        zIndex: 2,
      }}>
        <h1 style={{
          color: "#764ba2",
          textAlign: "center",
          fontSize: "36px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}>
          Create Account
        </h1>
        <p style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "30px",
          fontSize: "14px",
        }}>
          Join NoteX to start organizing your thoughts
        </p>

        {message && (
          <div style={{
            backgroundColor: message.includes("failed") ? "#fee" : "#d4edda",
            color: message.includes("failed") ? "#c33" : "#155724",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "14px",
          }}>
            {message}
          </div>
        )}

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="👤 Username"
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
            marginBottom: "15px",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#764ba2";
            e.target.style.boxShadow = "0 0 0 3px rgba(118, 75, 162, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e0e0e0";
            e.target.style.boxShadow = "none";
          }}
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="📧 Email"
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
            marginBottom: "15px",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#764ba2";
            e.target.style.boxShadow = "0 0 0 3px rgba(118, 75, 162, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e0e0e0";
            e.target.style.boxShadow = "none";
          }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒 Password"
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
            marginBottom: "25px",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#764ba2";
            e.target.style.boxShadow = "0 0 0 3px rgba(118, 75, 162, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e0e0e0";
            e.target.style.boxShadow = "none";
          }}
        />

        <button
          onClick={RegisterUser}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            marginBottom: "20px",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          {loading ? "Creating account..." : "🚀 Register Now"}
        </button>

        <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{
            color: "#764ba2",
            textDecoration: "none",
            fontWeight: "bold",
          }}>
            Login →
          </Link>
        </p>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            33% {
              transform: translateY(-30px) translateX(20px);
            }
            66% {
              transform: translateY(20px) translateX(-20px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Register;
