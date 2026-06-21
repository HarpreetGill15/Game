

import '../App.css'
//import axios from 'axios'
import Header from '../components/Header'
// import {useNavigate} from 'react-router-dom'
// import { useState } from 'react';

// const [playerName, setPlayerName] = useState("");
// const [roomCode, setRoomCode] = useState("");
// const navigate = useNavigate();
// const joinRoom = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/join-room", {
//       roomCode, playerName
//     });
//     console.log(response.data);
// } catch (error) {
//     console.error("Error joining room:", error);
// }
// };

function JoinRoom() {
  

  return (
    <>
    <script>
        <title>Join Room</title>
    </script>
        <Header />
      <section id="center">
        <h1>Enter Room Code:</h1>
        <textarea
          id="room-code"
          name="room-code"
          placeholder="Enter room code"
        />
        <button
          type="button"
          className="counter"
          //onClick={joinRoom}
          >
            Join Room
          </button>
      </section>
     
      
    </>
  )
}

export default JoinRoom