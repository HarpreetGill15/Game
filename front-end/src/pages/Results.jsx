


function Results({results}){
    { console.log("result: ",{results})}

    if(!results || results.length === 0){
        return(
            <h2>Waiting for</h2>
        )
    }
    return(
        // results page will show the final leaderboard
        <div>
            <section id="center">
                <h1>Leaderboard</h1>
               
                {results.map((player) => (
                    <div key={player.socketId}>
                        <h2>{player.name}: {player.score} points</h2>
                    </div>
                ))}
                {/* <ul>
                    {leaderboard.map((player, index) => (
                        <li key={index}>{player.name}: {player.score} points</li>
                    ))}
                </ul> */}
            </section>
        </div>
        
    )
}
export default Results