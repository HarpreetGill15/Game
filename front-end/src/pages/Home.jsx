

import '../App.css'
//import axios from 'axios'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // const createRoom = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/create-room");
  //     const roomCode = response.data.roomCode;

  //     navigate(`/lobby/${roomCode}`);
  //   } catch (error) {
  //     console.error("Error creating room:", error);
  //   }
  // };

  
  return (
    <>
    
        <Header />
      <section id="center">
        <div className="hero">
          <h1>Create a Room</h1>
        </div>
        <div>
          
          <p>
            Press below to create a room and invite your friends to play the trivia game together!
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => navigate("/create")}
        >
          Create Room 
        </button>
        <p>Join an existing room be clicking on the button below</p>
        
          
        <button
          type="button"
          className="counter"
          onClick={() => navigate("/join")}
        >
          Join Room
        </button>
      </section>

      
    </>
  )
}

export default Home