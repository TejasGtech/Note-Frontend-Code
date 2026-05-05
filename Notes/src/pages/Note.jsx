import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Backend_URL from "../config";

const Note = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [noteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const CreateNote = async () => {
    if (!title.trim() || !notes.trim()) {
      setMessage("Please fill both title and notes");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${Backend_URL}/api/note/CreateNotes`,
        { title: title, notes: notes },
        { withCredentials: true },
      );
      setMessage(response.data.message);
      setTitle("");
      setNotes("");
      await FetchNotes();
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Notes create fail");
    }
    setLoading(false);
  };

  const FetchNotes = async () => {
    try {
      const response = await axios.get(`${Backend_URL}/api/note/FetchNotes`, {
        withCredentials: true,
      });
      setNoteData(response.data.fetchdata);
    } catch (error) {
      console.error(error);
      setMessage("Notes fetch fails");
    }
  };

  const DeleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setLoading(true);
      try {
        const response = await axios.get(`${Backend_URL}/api/note/Delete/${id}`, {
          withCredentials: true,
        });
        setMessage(response.data.message);
        await FetchNotes();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error(error.response?.data || error);
        setMessage("Error deleting note");
      }
      setLoading(false);
    }
  };

  const sendID = (data) => {
    navigate("/update", {
      state: { id: data._id, title: data.title, notes: data.notes },
    });
  };

  const Logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        const res = await axios.get(`${Backend_URL}/api/auth/logout`, {
          withCredentials: true,
        });
        setMessage(res.data.message);
        navigate("/");
      } catch (error) {
        setMessage("logout error occurred");
      }
    }
  };

  useEffect(() => {
    FetchNotes();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto 40px",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
      }}>
        <h1 style={{
          color: "#fade26",
          fontSize: "36px",
          margin: 0,
          textShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}>
          NoteX
        </h1>
        <button
          onClick={Logout}
          style={{
            padding: "10px 24px",
            backgroundColor: "rgba(255, 69, 58, 0.9)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ff3b30";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(255, 69, 58, 0.9)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          🚪 Logout
        </button>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Create Note Section */}
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}>
          <h2 style={{
            color: "#764ba2",
            fontSize: "24px",
            marginBottom: "20px",
          }}>
            ✍️ Create New Note
          </h2>

          {message && (
            <div style={{
              backgroundColor: message.includes("fail") ? "#fee" : "#d4edda",
              color: message.includes("fail") ? "#c33" : "#155724",
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
            placeholder="📌 Note Title"
            style={{
              width: "100%",
              padding: "12px",
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
            placeholder="📝 Write your note here..."
            rows="4"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              marginBottom: "20px",
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
            onClick={CreateNote}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
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
            {loading ? "Creating..." : "📝 Create Note"}
          </button>
        </div>

        {/* All Notes Section */}
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            padding: "0 10px",
          }}>
            <h2 style={{ color: "#fff", margin: 0 }}>📚 All Notes</h2>
            <button
              onClick={FetchNotes}
              style={{
                padding: "8px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              🔄 Refresh
            </button>
          </div>

          {noteData.length === 0 ? (
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "60px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
            }}>
              <p style={{ color: "#fff", fontSize: "18px" }}>
                📭 No notes yet. Create your first note above!
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {noteData.map((elem, index) => (
                <div
                  key={elem._id}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "20px",
                    padding: "20px",
                    transition: "all 0.3s ease",
                    animation: `fadeInUp 0.3s ease-out ${index * 0.1}s`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3 style={{
                    color: "#764ba2",
                    fontSize: "20px",
                    marginBottom: "10px",
                    wordBreak: "break-word",
                  }}>
                    {elem.title}
                  </h3>
                  <p style={{
                    color: "#555",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                    wordBreak: "break-word",
                  }}>
                    {elem.notes}
                  </p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => DeleteNote(elem._id)}
                      style={{
                        padding: "8px 20px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#c82333";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#dc3545";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      🗑️ Delete
                    </button>
                    <button
                      onClick={() => sendID(elem)}
                      style={{
                        padding: "8px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#218838";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#28a745";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      ✏️ Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Note;
