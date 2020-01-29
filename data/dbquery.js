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
    let arr = [];
    let j = 0;
    for (var i = 0; i < data.length; i++) {

      let obj = {
        stop_id:data[i].stop_id,
        child_ids : [data[i]._id],
        child_names : [data[i].name]
      }

      while(i<data.length-1 && data[i].stop_id == data[i+1].stop_id){
        obj.child_ids.push(data[i+1]._id);
        obj.child_names.push(data[i+1].name);
        i++;
      }

      arr.push(obj);

    }
    console.log(arr);
    res.send(arr);
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
