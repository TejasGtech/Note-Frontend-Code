import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Note from "./pages/Note";
import UpdateNote from "./pages/UpdateNote";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/note" element={<Note />} />
      <Route path="/update" element={<UpdateNote />} />
    </Routes>
  );
};

export default App;
