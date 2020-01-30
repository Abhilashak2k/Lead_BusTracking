const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const port = process.env.PORT || 4300;
const route = require('./routes/routes');
const socket = require('./controller/socket');
const bodyParser = require('body-parser');
const dbconnection = require('./data/dbconnection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', route);

app.use(express.static(path.join(__dirname, './public')));
http.listen(port, () => console.log(`App running on ${port}`));

module.exports = app;