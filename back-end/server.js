const express = require("express");
const cors = require("cors");

const { Server } = require("socket.io");
const http = require("http");
const app = express();
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
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
    rooms[roomCode] = {
        players: [],
        createdAt: new Date(),
    };
    console.log(`Room ${roomCode} created`);
    res.json({ roomCode: roomCode });
});

app.post("/join-room", (req, res) => {
    const { roomCode, playerName } = req.body;
    const room = rooms[roomCode];
    if (!room) {
        return res.status(404).json({ 
            success: false,
            message: "Room not found" 
        });
    }
    room.players.push(playerName);
    io.to(roomCode).emit("player-update",room.players);
    res.json({
        success: true,
        players: room.players 
        });
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);

        socket.on("join-room", ({ roomCode}) => {
            socket.join(roomCode);

            console.log(`User ${socket.id} joined room ${roomCode}`);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
    });