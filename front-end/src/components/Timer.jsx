import { useState, useEffect } from 'react';
import socket from "../socket";




function Timer(){
    const [timeLeft, setTimeLeft] = useState(20);
    useEffect(() => {

        socket.on('timer-update', (time) => {
            console.log(`Received timer update: ${time} seconds left`);
            setTimeLeft(time);
        });
        return () => {
            socket.off('timer-update');
        }
    }, []);
    return(
        // timer component will show the countdown for each question
        <div>
            <section id="center">
            <h1>Timer: {timeLeft} seconds</h1>
            </section>
        </div>
)}
export default Timer