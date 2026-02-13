import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Note = () => {
   const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");
    const[noteData,setNoteData]=useState([]);

    const navigate = useNavigate();

    const CreateNote = async()=>{
       
      try{
        const responce = await axios.post('https://notes-backend-code.onrender.com/api/note/CreateNotes',{title : title,notes : notes},{ withCredentials: true })
        setMessage(responce.data.message);
         setTitle("");
         setNotes("");
         try{
            await FetchNotes();
         }catch(err){
            setMessage('fetch error, click refresh'); 
         }
      }catch(error){
        setMessage('Notes create fail');
      }
    }

    const FetchNotes = async () => {
  try {
    const response = await axios.get(
      "https://notes-backend-code.onrender.com/api/note/FetchNotes",
      { withCredentials: true }
    );

    setNoteData(response.data.fetchdata); 
  } catch (error) {
    console.error(error);
    setMessage("Notes fetch fails");
  }
};

const DeleteNote = async (id) => {
  console.log(id)
  try {
    const response = await axios.get(
      `https://notes-backend-code.onrender.com/api/note/Delete/${id}`,
      { withCredentials: true }
    );

    setMessage(response.data.message);

    // refresh notes after delete
    await FetchNotes();

  } catch (error) {
    console.error(error.response?.data || error);
    setMessage("Error deleting note");
  }
};

const sendID = (data)=>{
  navigate('/update',{
    state:{id:data._id,title:data.title,notes : data.notes}
  });
}

const Logout = async()=>{
  try{
    const res = await axios.get('https://notes-backend-code.onrender.com/api/auth/logout',{withCredentials:true})

    setMessage(res.data.message)
    navigate('/')
  }catch(error){
    setMessage('logout error occure')
  }
}




    useEffect(()=>{
      FetchNotes();
    },[])

  
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h1 style={{color:"#fade26"}}>NoteX</h1>

        <button onClick={Logout} style={{color:"white",width:'100px',backgroundColor:"red",borderRadius:"20px",height:'40px'}}>Logout</button>

        <h2 style={{color:'#fade26'}}>Create notes</h2>
        
         <h4 style={{color:'#15b55d'}}>{message}</h4>
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
        }}
      />
      <button
        onClick={CreateNote}
        style={{
          width: "400px",
          height: "50px",
          borderRadius: "20px",
          marginTop: "10px",
          backgroundColor:"#fade26"
        }}
      >
        Create note
      </button>
   <div style={{display:'flex',flexDirection:"row"}}>
      <h1 style={{color:'#fade26'}}>All Notes</h1>
      <button onClick={FetchNotes} style={{width:'80px',height:'30px',borderRadius:"20px",marginTop:'28px',marginLeft:'20px',backgroundColor:'#79cbdb'}}>Refresh</button>
   </div>

<div>
 {Array.isArray(noteData) &&
  noteData.map((elem) => (
    <div key={elem._id} style={{backgroundColor:'#fade26',width:'400px',height:"130px",borderRadius:'20px',justifyContent:'center',alignItems:'center'}}>
      <h4 style={{marginLeft:'20px',paddingTop:"10px"}}>Title :{elem.title}</h4>
      <h5 style={{marginLeft:'20px'}}>Notes: {elem.notes}</h5>
      <button onClick={()=>DeleteNote(elem._id)} style={{backgroundColor:'red',width:'100px',height:'30px',borderRadius:"20px",marginLeft:'10px',color:"#fff"}}>Delete</button>
      <button onClick={()=>sendID(elem)} style={{backgroundColor:'green',width:'100px',height:'30px',borderRadius:"20px",marginLeft:'10px',color:'#fff'}}>Update note</button>
 
 
    </div>
  ))}

</div>

    </div>
  )
}

export default Note;
