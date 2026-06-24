const express = require("express");
const cors = require("cors");

const { Server } = require("socket.io");
const http = require("http");
const app = express();

const questions = require("./questions");

app.get("/", (req, res) => {
  res.send("Server Running");
});


app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin: "http://localhost:5173",
  }
});

server.listen(3000, () => {
  console.log("Server running");
});
const rooms = {};
function generateRoomCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";

  for (let i = 0; i < 4; i++) {
    code += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return code;
}
app.post("/create-room", (req, res) => {
    const roomCode = generateRoomCode();
    const { playerName } = req.body;
    rooms[roomCode] = {
        players: [playerName],
        createdAt: new Date(),
    };
    console.log(`Room ${roomCode} created`);
    console.log("Host Name:", playerName);
    res.json({ roomCode: roomCode });
});

app.post("/join-room", (req, res) => {
    const { roomCode, playerName } = req.body;

    console.log(`Player ${playerName} is trying to join room ${roomCode}`);
    console.log("Current rooms:", rooms);

    const room = rooms[roomCode] ;
    if (!room) {
        return res.status(404).json({ 
            success: false,
            message: "Room not found" 
        });
    }
    res.json({
        success: true,
        players: room.players 
        });
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);

        socket.on("join-room", ({ roomCode, playerName }) => {
            socket.join(roomCode);

            const room = rooms[roomCode];
            if(!room) return;

            const existingPlayer = room.players.find(
              player => player.socketId === socket.id
            );

            if(!existingPlayer){

              room.players.push({
                name: playerName,
                socketId: socket.id,
                score:0
              });
            }
            console.log("Players: ",room.players)
            
            io.to(roomCode).emit("player-update",room.players);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
        socket.on("start-game", ({ roomCode }) => {
          console.log(`Starting time in room ${roomCode}`);
          const currentQuestion = questions[0];
          console.log(`Sending question to room ${roomCode}:`, currentQuestion);
          setTimeout(() => {
            io.to(roomCode).emit("question-update", currentQuestion);
          }, 2000);

          let timeLeft = 20;

          const timerInterval = setInterval(() => {
            console.log(`Time left in room ${roomCode}: ${timeLeft} seconds`);
            io.to(roomCode).emit("timer-update", timeLeft);
            timeLeft--;
            if (timeLeft < 0) {
              clearInterval(timerInterval);

              const room = rooms[roomCode];

              const leaderboard = room.players.map(player => {
                 return {
                  name: player.name,
                  socketId: player.socketId,
                  answer: room.answer[player.socketId],
                  score: player.score
                 }
              })
              io.to(roomCode).emit("show-results", leaderboard);
            }
          }, 1000);
          
      io.to(roomCode).emit("game-started");
      console.log(`Game started in room ${roomCode}`);
    });
    socket.on("submit-answer", ({ roomCode, answer }) => {
      const room = rooms[roomCode];
      if (!room) {
        console.error(`Room ${roomCode} not found for answer submission`);
        return;
      }
      if (room.answers[socket.id]) {
        console.warn(`User ${socket.id} has already submitted an answer for room ${roomCode}`);
        return;
      }

      room.answers[socket.id] = answer;

      console.log("ansers:" ,room.answers);
    });
    });
    app.get("/room/:roomCode", (req, res) => {
      const room = rooms[req.params.roomCode];
      if (!room) {
        return res.status(404).json({
          success: false,
          message: "Room not found"
        });
      }
      res.json({
        success: true,
        room: room
      });
    });
    