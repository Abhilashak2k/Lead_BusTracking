const mysql = require('mysql');

const poolDB = mysql.createPool({
  connectionLimit : 50,
  host : "localhost",
  user : "root",
  password : "",
  database : "bustracking"
});


exports.UpdateConductorRouteInfo = (req,res)=>{

    var busno = req.body.BusNo;
    var shift = req.body.Shift;

    poolDB.getConnection(function (err, conn) {

        conn.query(`SELECT route_id FROM route WHERE bus_id = ${busno} AND shift = "${shift}"`, (err, data)=>{
          if(err)
            console.log(err);
          else{
            console.log("SQL query result is " + data[0].route_id);
            res.status(200).send((data[0].route_id).toString());
          }
        })

    });
  }


exports.UpdateParentRouteInfo = (req, res) =>{

    var parent_no = req.body.PhNo;
    console.log("IN UpdateParentRouteInfo");

    poolDB.getConnection((err, conn)=>{

      conn.query(`SELECT route_id FROM student WHERE _id = (SELECT child_id FROM parent_child WHERE parent_id = (SELECT _id FROM parent WHERE phone = "${parent_no}"))`, (err, data)=>{
        if(err)
          console.log(err);
        else{
            console.log(data);
            res.status(200).send((data[0].route_id).toString());
        }
      })

    });



}







// var ParentDetail = require('./models/ParentDetail.model');
// var BusDetail = require('./models/BusDetail.model');
// var RouteDetail = require('./models/RouteDetail.model');
// var ConductorDetail = require('./models/ConductorDetails.model');
//
// var mongoose = require('mongoose');
//
// exports.UpdateConductorRouteInfo = (req,res)=>{
//
//     var busno = req.body.BusNo;
//     var shift = req.body.Shift;
//
//     console.log("in dbquery");
//
//     BusDetail.findOne({'BusNo': busno})
//     .then((businfo)=>{
//         console.log(businfo);
//         var routeid = "unable to find";
//
//         var arr1 = [...businfo.ShiftArray];
//         const found = arr1.find(element => element['Shift'] === shift);
//
//             if (typeof found !== 'undefined')
//             routeid = found.RouteId
//
//             res.send(routeid);
//
//     }).catch((error)=>{
//            res.send("some error");
//     });
//
//     res.send("bus");
//
//
// }
//
// exports.FindParentSendNotification = (req,res)=>{
//
//     var regno = req.body.regno;
//
//     // ChildDetail.find({'Regno':regno})
//     // .then((childinfo)=>{
//
//     // }).catch((error)=>{
//
//     // });
// }
//
//
//
// exports.addparent = (req,res)=>{
//
//     ParentDetail(req.body).save()
//     .then((info)=>{
//         res.send('saved');
//
//     }).catch((error)=>{
//         res.send('some error');
//     })
// };
//
// exports.addparent = (req,res)=>{
//
//     ParentDetail(req.body).save()
//     .then((info)=>{
//         res.send('saved');
//
//     }).catch((error)=>{
//         res.send('some error');
//     })
// };
