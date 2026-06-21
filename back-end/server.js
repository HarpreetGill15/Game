const express = require("express");
const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
  res.send("Server Running");
});


app.use(cors());
app.use(express.json());
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
app.listen(3000, () => {
  console.log("Server running");
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

    res.json({
        success: true,
        message: room.players 
        });
    });