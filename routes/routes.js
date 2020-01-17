const express = require('express');
const app = express();
const dbquery = require('../data/dbquery');
const notification = require('../controller/notification');

app.post('/FindParentSendNotification', dbquery.FindParentSendNotification);
app.post('/UpdateConductorRouteInfo', dbquery.UpdateConductorRouteInfo);
app.post('/UpdateParentRouteInfo', dbquery.UpdateParentRouteInfo);
app.post('/sendsms',notification.SendSms);

module.exports = app;
