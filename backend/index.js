const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const userroutes=require('./routes/userroutes')
const {Server}=require('socket.io')
const {createServer} =require("http")
dotenv.config()


const port=process.env.PORT
const app=express()
const httpserver=createServer(app)
const io=new Server(httpserver,{
    cors:{
        origin:"*"
    }
})
app.use(cors({
    origin: "http://localhost:3000",  
    credentials: true 
}));
app.use(express.json())
app.use('/api',userroutes)
app.use(express.urlencoded({extended:false}))


httpserver.listen(port,()=>{
    console.log(`app is runing on port:`,port )
})

io.on("connection", (socket) => {
    console.log("The socket is connected:", socket.id);

    socket.on("message",(data)=>{
        console.log("Server side message",data)
        socket.broadcast.emit("message",data)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});