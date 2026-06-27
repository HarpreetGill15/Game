
import axios from 'axios'
import '../App.css'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import socket from '../socket';



function CreateRoom() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");

  const createRoom = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create-room", {
        playerName
      });
      const roomCode = response.data.roomCode;
      socket.emit("join-room", {
    roomCode,
    playerName
});
localStorage.setItem("playerName", playerName);

navigate(`/lobby/${roomCode}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <>
    <script>
        
        <title>Create Room</title>
        
        
        
        
    </script>
    <script>
            
        </script>
        <Header />
      <section id="center">
        <h1>Enter Host Name</h1>
        <textarea
          id="host-name"
          name="host-name"
          placeholder="Enter host name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          type="button"
          onClick={createRoom}
        >
          Create Room
        </button>
      </section>
      {/* Put players that joined here */}
    <section id="center">
        <div className="hero">
          <h1>Waiting for players...</h1>
        </div>
    </section>
      
    </>
  )
}

export default CreateRoom