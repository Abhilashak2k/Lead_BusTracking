const DB = require('./dbconnection')
const fireQuery = require('./fireQuery');
const request = require('request');
const poolDB = DB.poolDB;
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

    fireQuery.FindAllParentsSendNotification(childList, (data)=>{
      console.log(data);
      res.send(data);
    })
}

exports.getConductorDetailsUsingRoute = (req, res) => {
  let routeid = req.body.route_id;



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
