

import '../App.css'
import axios from 'axios'
import Header from '../components/Header'

function Home() {
const createRoom = async () => {
            const response = await axios.post("http://localhost:3000/create-room");
            console.log(response.data);
        };
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
          onClick={createRoom}
        >
          Create Room 
        </button>
        <p>Join an existing room be clicking on the button below</p>
        
          
        <button
          type="button"
          className="counter">
            Join Room
          </button>
      </section>

      
    </>
  )
}

export default Home