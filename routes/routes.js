const express = require('express');
const app = express();
const dbquery = require('../data/dbquery');
const redisquery = require('../data/redis');
const notification = require('../controller/notification');

app.post('/FindParentSendNotification', dbquery.FindParentSendNotification);
app.post('/UpdateConductorRouteInfo', dbquery.UpdateConductorRouteInfo);
app.post('/UpdateParentRouteInfo', dbquery.UpdateParentRouteInfo);
app.post('/GetAllStops',redisquery.getallstops);
app.post('/GetCurrentTrail',redisquery.getcurrenttrail);

app.post('/sendsms',notification.SendSms);

module.exports = app;
