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
  //console.log(req.body,typeof(req.body));
  var obj = req.body;
  //console.log(Object.keys(obj));
    let childList = obj['rollList[]'];
    let n_childList = obj['n_rollList[]'];

    console.log(childList, n_childList);

    if(childList == undefined)
      childList=[];

    if(n_childList == undefined)
      n_childList=[];

    fireQuery.FindAllParentsSendNotification(childList, n_childList, (data, n_data)=>{
      for (var i = 0; i < data.length; i++) {
        data[i] = data[i].phone;
      }

      for (var i = 0; i < n_data.length; i++) {
        n_data[i] = n_data[i].phone;
      }

      console.log("in dbquery", data, n_data);

      notification.SendSmsNotif( data , n_data,  (result, n_result)=>{
          console.log(result, n_result);
          let finalResult = result+n_result;
          res.send(finalResult);
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
        stop_name:data[i].name,
        child_ids : [data[i]._id],
        child_names : [data[i].sname]
      }

      while(i<data.length-1 && data[i].stop_id == data[i+1].stop_id){
        obj.child_ids.push(data[i+1]._id);
        obj.child_names.push(data[i+1].sname);
        i++;
      }

      arr.push(obj);

    }
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
