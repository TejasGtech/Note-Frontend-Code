import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

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
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          animation: "float 20s infinite ease-in-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          animation: "float 15s infinite ease-in-out reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "20%",
          width: "150px",
          height: "150px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          animation: "float 25s infinite ease-in-out",
        }}
      />

      {/* Main content */}
      <div
        style={{
          textAlign: "center",
          zIndex: 2,
          animation: "fadeInUp 0.8s ease-out",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "#fff" }}>Welcome to </span>
          <span
            style={{
              color: "#fade26",
              textShadow: "0 0 20px rgba(250, 222, 38, 0.3)",
              position: "relative",
              display: "inline-block",
            }}
          >
            NoteX
            <span
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "0",
                right: "0",
                height: "3px",
                background: "linear-gradient(90deg, transparent, #fade26, transparent)",
              }}
            />
          </span>
        </div>

        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "18px",
            marginBottom: "40px",
            maxWidth: "500px",
            lineHeight: "1.6",
          }}
        >
          Capture your thoughts, organize your ideas, and boost your productivity
        </p>

        <button
          onClick={() => navigate("/register")}
          style={{
            width: "300px",
            padding: "15px 40px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "50px",
            background: "linear-gradient(135deg, #fade26 0%, #ffd700 100%)",
            color: "#333",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            marginBottom: "15px",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
          }}
        >
          🚀 Register Now
        </button>

        <div>
          <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Already have an account?{" "}
          </span>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent",
              border: "none",
              color: "#fade26",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "underline",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#ffd700";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#fade26";
            }}
          >
            Login →
          </button>
        </div>
      </div>

      {/* Keyframes animation */}
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

export default Home;
