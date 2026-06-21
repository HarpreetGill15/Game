import Results from './Results'
import Timer from '../components/Timer'

function Questions(){
    return(
        // questions page will show the question and the 4 options to choose from. It will also have a timer for each question
        <div>
            <section id="center">
            <h1>Question 1</h1>
            <p>What is the capital of France?</p>
            <button>Option 1: Paris</button>
            <button>Option 2: London</button>
            <button>Option 3: Berlin</button>
            <button>Option 4: Madrid</button>
            </section>
            {/* Timer */}
            <section id="center">
            <Timer />
            </section>
            {/* Leaderboard update only after each question is answered */}
            <section id="center">
            <Results />
            </section>
        </div>
        
    )
}
export default Questions