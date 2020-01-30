const express = require('express');
const app = express();
const dbquery = require('../data/dbquery');
const redisquery = require('../data/redis');
const notification = require('../controller/notification');


app.post('/FindAllParentsSendNotification', dbquery.FindAllParentsSendNotification);
app.post('/UpdateConductorRouteInfo', dbquery.UpdateConductorRouteInfo);
app.post('/getConductorDetailsUsingRoute', dbquery.getConductorDetailsUsingRoute);
app.post('/UpdateParentRouteInfo', dbquery.UpdateParentRouteInfo);
app.post('/getStopsFromDB', dbquery.getStopsFromDB);
app.post('/GetAllStops',redisquery.GetAllStops);
app.post('/GetCurrentTrail',redisquery.GetCurrentTrail);

module.exports = app;
