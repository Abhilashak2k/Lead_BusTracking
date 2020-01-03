const express = require('express');
const app = express();
const path = require('path');
var mongoose = require('mongoose');
var http = require('http').Server(app);
const dbquery = require('./dbquery');

const port = process.env.PORT || 4300;


var io = require('socket.io')(3600);


   io.on('connection', (socket) =>{

        socket.on('new-user', (room) => {
          socket.join(room)

        });

        socket.on('getloc', (message) => {
          var room = message.room;
          io.to(room).emit('loc', message);
        });

        console.log('a user is connected ')
   });

   io.on('disconnection', (socket)=>{
     console.log("user disconnected " + socket );
   })

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.post('/UpdateConductorRouteInfo', dbquery.UpdateConductorRouteInfo);
app.post('/UpdateParentRouteInfo', dbquery.UpdateParentRouteInfo);

app.use(express.static(path.join(__dirname, 'public')));
http.listen(port, ()=>console.log(`App running on ${port}`));


/**********DB Query**********/
