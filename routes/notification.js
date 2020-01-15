const notification = require('../controller/notification');
const express = require('express');
const app = express();

app.post('/sendsms',notification.SendSms);

module.exports = app;
