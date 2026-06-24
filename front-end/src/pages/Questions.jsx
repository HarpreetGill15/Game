import Results from './Results'
import Timer from '../components/Timer'
import { useParams} from 'react-router-dom';
import QuestionDisplay from '../components/QuestionDisplay';
import socket from "../socket";
import { useEffect, useState } from 'react';

function Questions(){
    const { roomCode } = useParams();
    const [question, setQuestion] = useState();
    const [results, setResults] =useState();

    useEffect(() => {
        socket.on('question-update', (newQuestion) => {
            console.log(`Received new question for room ${roomCode}:`, newQuestion);
            setQuestion(newQuestion);
        });
        return () => {
            socket.off('question-update');
        }
        

    }, []);

    useEffect(() => {
        socket.on('show-results', (leaderboard) => {
            console.log('Received answers:', leaderboard);
            setResults(leaderboard);
            // Handle the received answers and update the leaderboard accordingly
        });
        return()=>{
            socket.off("show-results");
        };
    },[]);
    const submitAnswer =  (selectedAnswer) => {
        console.log("Submitting answer for room:", roomCode , "Selected answer:", selectedAnswer);
        // Handle answer submission logic here
        socket.emit('submit-answer', { roomCode, answer: selectedAnswer ,playerName: "Player1" }); // Replace "Player1" with the actual player name
        try {
             // Replace with the selected answer
            console.log("Submitting answer:", selectedAnswer);
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };
    
   
    return(
        // questions page will show the question and the 4 options to choose from. It will also have a timer for each question
        <div>
            <QuestionDisplay question={question} onAnswer={submitAnswer} />
            
            {/* Timer */}
            <Timer />
            {/* Leaderboard update only after each question is answered */}
            <section id="center">
            <Results results={results}/>
            </section>
        </div>
        
    )
}
export default Questions