const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    socket.on("message", data => {
      socket.broadcast.emit("messageResponse", data)
    })
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});