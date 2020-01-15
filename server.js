const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const http = require('http').Server(app);
const dbquery = require('./dbquery');
const notification = require('./notification');

const port = process.env.PORT || 4300;
const io = require('socket.io')(3600);

io.on('connection', (socket) => {

    socket.on('new-user', (room) => {
        socket.join(room)

    });

    socket.on('getloc', (message) => {
        let room = message.room;
        io.to(room).emit('loc', message);
    });

    console.log('a user is connected ');

    socket.on('dis-user', (room)=>{
        io.to(room).emit('dis-user', "Driver disconnecting");
        console.log("user disconnecting");
        socket.disconnect();
        console.log(room);
    });
});


const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.post('/FindParentSendNotification', dbquery.FindParentSendNotification);
app.post('/UpdateConductorRouteInfo', dbquery.UpdateConductorRouteInfo);
app.post('/UpdateParentRouteInfo', dbquery.UpdateParentRouteInfo);
app.post('/sendsms',notification.SendSms);

app.use(express.static(path.join(__dirname, 'public')));
http.listen(port, () => console.log(`App running on ${port}`));
