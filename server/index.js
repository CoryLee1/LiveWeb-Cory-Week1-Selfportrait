import express from 'express';  
//import { createServer } from "http"
import { Server } from "socket.io"
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

//const httpServer = createServer()
const PORT = process.env.PORT || 3500
const app = express()
app.use(express.static(path.join(__dirname, "public")));
const expressServer = app.listen(PORT,()=>{
    console.log('listening on ${PORT}')
})
const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)//get user information

    socket.on('message', data => {
        console.log(data)//The Text we received
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)//send the message to evryone who connected the sever
    })
})

//httpServer.listen(3500, () => console.log('listening on port 3500'))