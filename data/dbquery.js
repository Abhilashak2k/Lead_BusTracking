const DB = require('./dbconnection')
const fireQuery = require('./fireQuery');
const request = require('request');
const app = require('../app');
const poolDB = DB.poolDB;
const notification = require('../controller/notification');
exports.UpdateConductorRouteInfo = (req, res) => {

    let busno = req.body.BusNo;
    let shift = req.body.Shift;

    fireQuery.UpdateConductorRouteInfo(busno, shift, (data)=>{
      console.log(data);
      res.send(data[0]._id.toString());
    });
}

exports.FindAllParentsSendNotification = (req, res) => {
    let childList =req.body.rollList;
    console.log(notification);
    fireQuery.FindAllParentsSendNotification(childList, (data)=>{
      for (var i = 0; i < data.length; i++) {
        data[i] = data[i].phone;
      }

      let result = notification.SendSms( "Hi your child has boarded", data , (result)=>{
          console.log(result);
          res.send(result);
        });
    })
}

exports.getConductorDetailsUsingRoute = (req, res) => {
  let routeid = req.body.route_id;
  fireQuery.getConductorDetailsUsingRoute(routeid, (data)=>{
    res.send(data);
  })
}

exports.UpdateParentRouteInfo = (req, res) => {

    let parent_no = req.body.PhNo;

    fireQuery.UpdateParentRouteInfo(parent_no, (data)=>{
      console.log(data);
      res.send(data);
    });

}

exports.getStopsFromDB = (req, res) =>{
  let routeid = req.body.route_id;

  fireQuery.getStopsFromDB(routeid, (data)=>{
    console.log("Stops from db " + data);
    res.send(data);
  })
}

exports.FindParentSendNotification = (req, res) => {
    let regNo = req.body.RegNo;
    console.log("Entered roll no is " + regNo);

    fireQuery.FindParentSendNotification(regNo, (data)=>{
      console.log(data);
      res.send(data.phone);

    });

}
