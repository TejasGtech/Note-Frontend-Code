import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#fff" }}>
        Welcome to <h1 style={{ color: "#fade26" }}>NoteX</h1>
      </h1>

      <button
        onClick={() => navigate("/register")}
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
          backgroundColor: "#fade26",
        }}
      >
        <h3>Register now</h3>
      </button>
      {/*<button onClick={()=>navigate('/login')} style={{width:'400px',height:'50px',borderRadius:'20px',marginTop:'10px',backgroundColor:'#ffffff'}}>Login Now</button>*/}
    </div>
  );
};

export default Home;
