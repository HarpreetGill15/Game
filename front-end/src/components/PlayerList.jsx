import axios from 'axios'
import {useEffect, useState} from 'react'


function PlayerList(){
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // Simulate fetching player data
        const fetchPlayers = async () => {
            try {
                // Replace this with your actual API call
                const response = await axios.get("http://localhost:3000/join-room");
                setPlayers(response.data);
                console.log("Fetched players:", response.data);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        fetchPlayers();
    }, []); // Add roomCode as a dependency to refetch when it changes

    return(
        // player list component will show the list of players in the room
        <div>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>
        </div>
    )
}
export default PlayerList