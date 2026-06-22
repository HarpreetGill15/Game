
import PlayerList from '../components/PlayerList'
import {useParams} from 'react-router-dom';

function Lobby() {
    const { roomCode } = useParams();

    return (
        <div>
            <h1>Room Code: {roomCode}</h1>
            <button
                type="button"
                > Start Game </button>
        <section id="center">

            <h1>Waiting for players...</h1>
            <PlayerList />
            </section>
        </div>
    )
}
export default Lobby