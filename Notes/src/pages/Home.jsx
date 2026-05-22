import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h1 style={{ color: "#fff" }}>Welcome to </h1>
          <h1 style={{ color: "#3B82F6", marginLeft: "8px" }}> NoteX</h1>
        </div>

        <button
          onClick={() => navigate("/register")}
          style={{
            width: "400px",
            height: "50px",
            borderRadius: "20px",
            marginTop: "10px",
            backgroundColor: "#3B82F6",
            boxShadow: "0px 1px 5px",
            borderWidth: "0px",
            fontWeight: 900,
            fontSize: "20px",
          }}
        >
          Register Now
        </button>
        {/*<button onClick={()=>navigate('/login')} style={{width:'400px',height:'50px',borderRadius:'20px',marginTop:'10px',backgroundColor:'#ffffff'}}>Login Now</button>*/}
      </div>
    </div>
  );
};

export default Home;
