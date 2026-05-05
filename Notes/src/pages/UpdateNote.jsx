import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Backend_URL from "../config";

const UpdateNote = () => {
  const location = useLocation();
  const id = location.state?.id;
  const title_se = location.state?.title;
  const notes_se = location.state?.notes;

  const [title, setTitle] = useState(title_se);
  const [notes, setNotes] = useState(notes_se);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpdate = async () => {
    if (!title.trim() || !notes.trim()) {
      setMessage("Please fill both title and notes");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${Backend_URL}/api/note/UpdateTitle/${id}`,
        { title },
        { withCredentials: true },
      );

      await axios.post(
        `${Backend_URL}/api/note/UpdateNotes/${id}`,
        { notes },
        { withCredentials: true },
      );

      setMessage("Note updated successfully!");
      setTimeout(() => navigate("/note"), 1500);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Update failed");
      setLoading(false);
    }
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
        padding: "20px",
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
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        animation: "fadeInUp 0.6s ease-out",
        zIndex: 2,
      }}>
        <button
          onClick={() => navigate("/note")}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            marginBottom: "20px",
            color: "#764ba2",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateX(-5px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateX(0)";
          }}
        >
          ← Back
        </button>

        <h1 style={{
          color: "#764ba2",
          fontSize: "32px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}>
          ✏️ Update Note
        </h1>
        <p style={{
          color: "#666",
          marginBottom: "30px",
          fontSize: "14px",
        }}>
          Make changes to your note
        </p>

        {message && (
          <div style={{
            backgroundColor: message.includes("success") ? "#d4edda" : "#fee",
            color: message.includes("success") ? "#155724" : "#c33",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
            textAlign: "center",
          }}>
            {message}
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="📌 Title"
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

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="📝 Content"
          rows="6"
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            border: "2px solid #e0e0e0",
            borderRadius: "12px",
            marginBottom: "25px",
            outline: "none",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
            resize: "vertical",
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
          onClick={handleUpdate}
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
          {loading ? "Updating..." : "💾 Update Note"}
        </button>
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

export default UpdateNote;
