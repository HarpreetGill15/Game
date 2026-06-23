


function PlayerList({ players = []}) {

    
    return(
        // player list component will show the list of players in the room
        <div>
            <ul>
                {players.map((player) => (
                    <li key={player}>{player}</li>
                ))}
            </ul>
        </div>
    )
}
export default PlayerList