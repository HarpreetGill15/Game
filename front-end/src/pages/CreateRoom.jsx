

import '../App.css'
import Header from '../components/Header'
import PlayerList from '../components/PlayerList'
const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();

function CreateRoom() {
  

  return (
    <>
    <script>
        
        <title>Create Room</title>
        
        
        
        
    </script>
    <script>
            
        </script>
        <Header />
      <section id="center">
        <h1>Room Code: {roomCode}</h1>
          <p>Join now!</p>
      </section>
      {/* Put players that joined here */}
    <section id="center">
        <div className="hero">
          <h1>Waiting for players...</h1>
            <PlayerList />
        </div>
    </section>
      
    </>
  )
}

export default CreateRoom