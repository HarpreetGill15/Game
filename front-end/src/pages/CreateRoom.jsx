
import axios from 'axios'
import '../App.css'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom';



function CreateRoom() {
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create-room");
      const roomCode = response.data.roomCode;

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