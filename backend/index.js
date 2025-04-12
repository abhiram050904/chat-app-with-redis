const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const userroutes=require('./routes/userroutes')
const {Server}=require('socket.io')
const { instrument } = require("@socket.io/admin-ui");
const {createServer} =require("http")
const { createAdapter } =require("@socket.io/redis-streams-adapter");
const redis = require('./configurations/redis')
dotenv.config()


const port=process.env.PORT
const app=express()
const httpserver=createServer(app)

app.use(cors({
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  }));

  
  app.use(express.json())
  app.use('/api',userroutes)
  app.use(express.urlencoded({extended:false}))

const io=new Server(httpserver,{
    cors: {
             origin: ["http://localhost:3000", "https://admin.socket.io"], // removed extra space
            credentials: true
          },
    adapter:createAdapter(redis)
})

instrument(io, {
    auth: false,
    mode: "development",
  });
  



httpserver.listen(port,()=>{
    console.log(`app is runing on port:`,port )
})

io.use((socket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
        return next(new Error("invalid room.Please pass the room number"));
    }
    socket.room = room;
    next();
});

io.on("connection", (socket) => {
    socket.join(socket.room);
    console.log(`Socket ${socket.id} joined room ${socket.room}`);

    socket.on("message", (data) => {
        console.log("Server side message:", data);

        // Emit only to others in the same room
        socket.to(socket.room).emit("message", data);

        socket.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
