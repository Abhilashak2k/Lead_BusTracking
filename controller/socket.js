const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const socketio = require('socket.io');
const io = socketio(3600);
console.log("In socket module");
io.on('connection', module.exports = function callBack(socket){
console.log("here");
    socket.on('new-user', (room) => {
        socket.join(room);
        

    });

    socket.on('getloc', (message) => {
        let room = message.room;
        let latlng = message.lat + "," + message.lang; 
        client.rpush(room,latlng);
        io.to(room).emit('loc', message);
    });

    console.log('a user is connected ')

    socket.on('dis-user', (room)=>{
        io.to(room).emit('dis-user', "Driver disconnecting");
        console.log("user disconnecting");
        socket.disconnect();
        client.del(room);
        console.log(room);
    });
});
