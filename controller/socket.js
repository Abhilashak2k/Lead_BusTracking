const express = require('express');
const app = express();
const socketio = require('socket.io')
const io = socketio(3600);

io.on('connection', module.exports = function callBack(socket){

    socket.on('new-user', (room) => {
        socket.join(room)

    });

    socket.on('getloc', (message) => {
        let room = message.room;
        io.to(room).emit('loc', message);
    });

    console.log('a user is connected ')

    socket.on('dis-user', (room)=>{
        io.to(room).emit('dis-user', "Driver disconnecting");
        console.log("user disconnecting");
        socket.disconnect();
        console.log(room);
    });
});