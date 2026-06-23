
import PlayerList from '../components/PlayerList'
import {useParams} from 'react-router-dom';
import {io} from 'socket.io-client';
import { useEffect, useState} from 'react';

const socket = io('http://localhost:3000');



function Lobby() {
    const { roomCode } = useParams();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.emit('join-room', { roomCode });
        },
    [roomCode]);

    useEffect(() => {
        socket.on('player-update', (players) => {
            setPlayers(players);
            console.log('Players updated:', players);
        });
    }, [roomCode]);

    return (
        <div>
            <h1>Room Code: {roomCode}</h1>
            <button
                type="button"
                > Start Game </button>
        <section id="center">

            <h1>Waiting for players...</h1>
            <PlayerList players={players} />
            </section>
        </div>
    )
    
}
export default Lobby