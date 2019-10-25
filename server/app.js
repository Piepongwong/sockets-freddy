const express = require("express");
const app = express();
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on("connection", client => {
    
    const pin =  Math.random().toString().substr(2,4)
    client.join(pin)
    
    io.to(pin).emit("pin", {pin})

    client.on("signup", data=> {
        client.join(data.pin)
        io.to(data.pin).emit("player-joined", {username: data.username})
    })
    
    client.on("start-game", (data)=>{
        io.to(data.pin).emit("game-started")
    })

})

io.of("/questions").on("connection", client => {
    
    client.on("join-room", data => {
        client.join(data.pin)
    })


})

server.listen(3000);

