
import PlayerList from '../components/PlayerList'
import {useParams, useNavigate} from 'react-router-dom';
import socket from "../socket";
import { useEffect, useState} from 'react';
import axios from 'axios';





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
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/room/${roomCode}`);
                setPlayers(response.data.room.players);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, [roomCode]);
    const startGame = () => {
        socket.emit('start-game', { roomCode });
    }   
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('game-started', () => {
            navigate(`/questions/${roomCode}`);
        });
        return () => {
            socket.off('game-started');
        }
    }, []);
    return (
        <div>
            <h1>Room Code: {roomCode}</h1>
            <button
                type="button"
                onClick={startGame}
                className="counter"
                > Start Game </button>
        <section id="center">

            <h1>Waiting for players...</h1>
            <PlayerList players={players} />
            </section>
        </div>
    )
    
}
export default Lobby