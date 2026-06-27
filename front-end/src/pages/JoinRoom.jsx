
import axios from 'axios';
import { useState } from 'react';
import '../App.css'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";
import socket from '../socket';


function JoinRoom() {
  

useEffect(() => {
  document.title = "Join Room";
}, []);

  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
const [roomCode, setRoomCode] = useState("");
const joinRoom = async () => {
  try {
    console.log("This >",roomCode,playerName)
    const response = await axios.post("http://localhost:3000/join-room", {
      roomCode,
      playerName,
    });
    localStorage.setItem("playerName", playerName);
console.log("trying to join " , response )

socket.emit("join-room",{
  roomCode,
  playerName,
});
navigate(`/lobby/${roomCode}`);
  } catch (error) {
    console.error("Error joining room:", error);
  }
};
  return (
    <>
        <Header />
      <section id="center">
        <h1>Enter Room Code:</h1>
        <input
          id="room-code"
          name="room-code"
          placeholder="Enter room code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
        />
        <input
          id="player-name"
          name="player-name"
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          type="button"
          className="counter"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </section>
     
      
    </>
  )
}

export default JoinRoom