


function PlayerList({ players = []}) {

    
    return(
        // player list component will show the list of players in the room
        <div>
            <ul>
                {players.map((player) => (
                    <li key={player.socketId}>{player.name}</li>
                ))}
            </ul>
        </div>
    )
}
export default PlayerList