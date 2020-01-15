const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const port = process.env.PORT || 4300;
const db_route = require('../routes/dbquery');
const sms_route = require('../routes/notification');
const socket = require('./socket');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/' , db_route);
app.use('/' , sms_route);


app.use(express.static(path.join(__dirname, '../public')));
http.listen(port, () => console.log(`App running on ${port}`));
