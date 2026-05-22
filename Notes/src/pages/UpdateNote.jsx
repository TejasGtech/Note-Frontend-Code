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
    try {
      setLoading(true);
      const response = await axios.post(
        `${Backend_URL}/api/note/UpdateTitle/${id}`,
        { title },
        { withCredentials: true },
      );

      setMessage(response.data.message);
      handleUpdate2();
      navigate("/note");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Update failed");
      setLoading(false);
    }
  };

  const handleUpdate2 = async () => {
    try {
      const response = await axios.post(
        `${Backend_URL}/api/note/UpdateNotes/${id}`,
        { notes },
        { withCredentials: true },
      );

      setMessage(response.data.message);

      navigate("/note");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Update failed");
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ color: "#F8FAFC" }}>Update Note</h1>

      <h4 style={{ color: "red" }}>{message}</h4>

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
          boxShadow: "0px 0px 5px",
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
          boxShadow: "0px 0px 5px",
        }}
      />

      <button
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
          backgroundColor: "#3B82F6",
          borderWidth: "0px",
          boxShadow: "0px 0px 5px",
        }}
        onClick={handleUpdate}
      >
        {" "}
        {loading ? <h3>Loading....</h3> : <h3>Update</h3>}
      </button>
    </div>
  );
};

export default UpdateNote;
