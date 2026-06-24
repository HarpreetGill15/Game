

// import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import Questions from './pages/Questions'
import Lobby from './pages/Lobby'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateRoom />} />
          <Route path="/join" element={<JoinRoom />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/lobby/:roomCode" element={<Lobby />} />
          <Route path="/questions/:roomCode" element={<Questions />} />
        </Routes>
    </BrowserRouter>
      
      {/* <section id="center">
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
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section> */}

      
    </>
  )
}

export default App
