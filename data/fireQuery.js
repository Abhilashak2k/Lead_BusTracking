const DB = require('./dbconnection')
const poolDB = DB.poolDB;
const client = require('./redisClient');
var multi = client.multi();

exports.getConductorDetailsUsingRoute = (routeid, returnData) => {
  poolDB.getConnection((err, conn)=>{
    if(err) throw err;
    else{
      console.log(routeid);
      conn.query(`SELECT
                    student._id,
                    student.name as sname,
                    student.stop_id,
                    bus_stops.name
                FROM
                    student
                JOIN bus_stops WHERE student.route_id = ${routeid} AND student.stop_id = bus_stops._id
                ORDER BY
                    stop_id`, (err, data)=>{
                    returnData(data);
                  })
    }
  });
}

exports.FindAllParentsSendNotification = (childList, n_childList, returnData) => {

    let ch_list = "(";
    for(let i=0;i<childList.length-1;i++){
      ch_list = ch_list + childList[i] + ",";
    }

    ch_list = ch_list + childList[childList.length-1] + ")";

    //childList created not time for n_childList for use inside the query

    let n_ch_list = "(";

    for(let i=0;i<n_childList.length-1;i++){
      n_ch_list = n_ch_list + n_childList[i] + ",";
    }

    n_ch_list = n_ch_list + n_childList[n_childList.length-1] + ")";

    poolDB.getConnection((err, conn)=>{
      conn.query(`SELECT phone
                  FROM parent
                  JOIN parent_child ON parent._id = parent_child.parent_id
                  AND child_id IN ${ch_list}`,
                  (err, data)=>{
                    console.log(data + "fq");
                    if(err) console.error();
                    else{
                      conn.query(`SELECT phone
                                  FROM parent
                                  JOIN parent_child ON parent._id = parent_child.parent_id
                                  AND child_id IN ${n_ch_list}`,
                                  (err, n_data)=>{
                                    console.log(n_data, "fqq");
                                    if(err) console.error();
                                    else{
                                      console.log( n_data,  "n firequery data");
                                      returnData(data, n_data);
                                    }
                                  })
                    }
                  })
    })
}

exports.getStopsFromDB = (routeid, returnData)=>{
  let routename = "r" + routeid;
      poolDB.getConnection(function (err, conn) {

          conn.query(`SELECT route_id,lat,lang
                      FROM stop_route
                      INNER JOIN bus_stops
                      WHERE stop_route.stop_id=bus_stops._id
                      AND route_id= ${routeid}`,
                      (err, data) => {
              if (err) throw err;
              else {
                  let routearray = [];
                  data.forEach((value) => {
                      let latlng = value.lat + "," + value.lang;
                      routearray.push(latlng);
                  })

                  routearray.forEach((values) => {
                      multi.rpush(routename, values);
                  })

                  multi.exec();

                  returnData(routearray);
                  console.log('here in fireQuery from redis');
              }
          })
      });
}

exports.UpdateConductorRouteInfo=(busno, shift, returnData)=>{
  poolDB.getConnection(function(err, conn) {

      conn.query(`SELECT _id
                  FROM   route
                  WHERE  bus_id = ${busno}
                  AND    shift = "${shift}"`, (err, data) => {
          if (err){
              console.log(err);
              return err;
            }
          else {
              returnData(data); //callback
              console.log("SQL query result is " + data);
          }
      })
  });
}

exports.UpdateParentRouteInfo = (parent_no, returnData)=>{
  poolDB.getConnection((err, conn) => {

      conn.query(`SELECT student.name, student.route_id
                  FROM student
                    JOIN parent_child ON student._id = parent_child.child_id
                    JOIN parent ON parent._id = parent_child.parent_id
                    AND phone = "${parent_no}"
                   `,
          (err, data) => {
              if (err)
                  console.log("There is an error " + err);
              else {
                returnData(data); //callback
                console.log("SQL query result is " + data);
              }
          })

  });
}
