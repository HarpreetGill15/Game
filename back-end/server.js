const express = require("express");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");


const {
    createRoom,
    getRoom,
    addPlayer
} = require("./roomManager");


const {
    startGame,
    submitAnswer
} = require("./gameManager");


const app = express();


app.use(cors());
app.use(express.json());


const server = http.createServer(app);


const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
});


const rooms = {};



function generateRoomCode(){

    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let code="";


    for(let i=0;i<4;i++){

        code += chars[
            Math.floor(
                Math.random()*chars.length
            )
        ];

    }


    return code;

}



// CREATE ROOM

app.post("/create-room",(req,res)=>{


    const {
        playerName
    } = req.body;


    const roomCode =
        generateRoomCode();



    createRoom(
        rooms,
        roomCode,
        playerName
    );


    res.json({
        roomCode
    });


});

// JOIN ROOM

app.post("/join-room", (req, res) => {

    const { roomCode } = req.body;

    const room = getRoom(
        rooms,
        roomCode
    );


    if (!room) {

        return res.status(404).json({
            success:false,
            message:"Room not found"
        });

    }


    res.json({
        success:true
    });

});


// GET ROOM

app.get("/room/:roomCode",(req,res)=>{


    const room =
        getRoom(
            rooms,
            req.params.roomCode
        );


    if(!room){

        return res.status(404).json({
            success:false
        });

    }


    res.json({
        success:true,
        room
    });


});




// SOCKETS

io.on("connection",(socket)=>{


    console.log(
        "Connected:",
        socket.id
    );



    socket.on(
        "join-room",
        ({
            roomCode,
            playerName
        })=>{
          console.log("joining ", roomCode, "guys: ",playerName);

        socket.join(roomCode);


        const room =
            getRoom(
                rooms,
                roomCode
            );


        if(!room)return;


        addPlayer(
            room,
            playerName,
            socket.id
        );


        io.to(roomCode)
        .emit(
            "player-update",
            room.players
        );


    });




    socket.on(
        "start-game",
        ({roomCode})=>{
          console.log("Starting game");

        const room =
            rooms[roomCode];


        const player =
            room.players.find(
                p=>p.socketId===socket.id
            );
console.log("ROOM:", room);
console.log("SOCKET ID:", socket.id);
console.log("PLAYER FOUND:", player);
console.log("HOST:", room.host);

        if(
            !player ||
            player.name !== room.host
        ){

            return;

        }


        startGame(
            io,
            rooms,
            roomCode
        );


    });




    socket.on(
        "submit-answer",
        ({
            roomCode,
            answer
        })=>{


        submitAnswer(
            rooms,
            roomCode,
            socket.id,
            answer
        );


    });



});



server.listen(3000,()=>{

    console.log(
        "Server running"
    );

});