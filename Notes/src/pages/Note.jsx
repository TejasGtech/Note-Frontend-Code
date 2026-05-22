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
    setLoading(true);
    try {
      const responce = await axios.post(
        `${Backend_URL}/api/note/CreateNotes`,
        { title: title, notes: notes },
        { withCredentials: true },
      );
      setMessage(responce.data.message);
      setTitle("");
      setNotes("");
      try {
        await FetchNotes();
      } catch (err) {
        setMessage("Notes fetch fail(Click refersh to see notes)");
      }
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
    setLoading(true);
    try {
      const response = await axios.get(`${Backend_URL}/api/note/Delete/${id}`, {
        withCredentials: true,
      });

      setMessage(response.data.message);

      // refresh notes after delete
      await FetchNotes();
    } catch (error) {
      console.error(error.response?.data || error);
      setMessage("Error deleting note");
    }
    setLoading(false);
  };

  const sendID = (data) => {
    navigate("/update", {
      state: { id: data._id, title: data.title, notes: data.notes },
    });
  };

  const Logout = async () => {
    try {
      const res = await axios.get(`${Backend_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      setMessage(res.data.message);
      navigate("/");
    } catch (error) {
      setMessage("logout error occure");
    }
  };

  useEffect(() => {
    FetchNotes();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#F8FAFC" }}>NoteX</h1>

      <button
        onClick={Logout}
        style={{
          color: "#000",
          width: "100px",
          backgroundColor: "red",
          borderRadius: "20px",
          height: "40px",
          boxShadow: "0px 1px 10px",
          borderWidth: "0px",
          fontWeight: 900,
        }}
      >
        Logout
      </button>

      <h2 style={{ color: "#F8FAFC" }}>Create notes</h2>

      <h4 style={{ color: "#15b55d" }}>{message}</h4>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
          borderWidth: "0px",
          boxShadow: "0px 1px 10px",
        }}
      />
      <input
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter notes"
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
          borderWidth: "0px",
          boxShadow: "0px 1px 10px",
        }}
      />
      <button
        onClick={CreateNote}
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
          backgroundColor: "#3B82F6",
          borderWidth: "0px",
          boxShadow: "0px 1px 10px",
          fontWeight: 900,
          fontSize: "20px",
        }}
      >
        {loading ? "Loading...." : "Create note"}
      </button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h1 style={{ color: "#F8FAFC" }}>All Notes</h1>
        <button
          onClick={FetchNotes}
          style={{
            width: "80px",
            height: "30px",
            borderRadius: "20px",
            marginTop: "28px",
            marginLeft: "20px",
            backgroundColor: "#06B6D4",
            borderWidth: "0px",
            boxShadow: "0px 1px 10px",
            fontWeight: 900,
          }}
        >
          Refresh
        </button>
      </div>

      <div>
        {Array.isArray(noteData) &&
          noteData.map((elem) => (
            <div
              key={elem._id}
              style={{
                backgroundColor: "#1E293B",

                borderRadius: "20px",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: "0px",
                boxShadow: "0px 1px 10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
              }}
            >
              <h4
                style={{
                  marginLeft: "20px",
                  paddingTop: "10px",
                  color: "#06B6D4",
                }}
              >
                {elem.title}
              </h4>

              <h5 style={{ marginLeft: "20px", color: "#F8FAFC" }}>
                {" "}
                {elem.notes}
              </h5>
              <div style={{ display: "flex" }}>
                <button
                  onClick={() => DeleteNote(elem._id)}
                  style={{
                    backgroundColor: "red",
                    width: "100px",
                    height: "30px",
                    borderRadius: "20px",
                    marginLeft: "10px",
                    color: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: "0px",
                    boxShadow: "0px 0px 5px",
                    fontWeight: 900,
                  }}
                >
                  {loading ? "Loading...." : "Delete"}
                </button>
                <button
                  onClick={() => sendID(elem)}
                  style={{
                    backgroundColor: "green",
                    width: "100px",
                    height: "30px",
                    borderRadius: "20px",
                    marginLeft: "10px",
                    color: "#000",
                    borderWidth: "0px",
                    boxShadow: "0px 0px 5px",
                    fontWeight: 900,
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Note;
