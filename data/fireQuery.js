const DB = require('./dbconnection')
const poolDB = DB.poolDB;

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

exports.FindParentSendNotification = (regNo, returnData) => {
  poolDB.getConnection((err, conn) => {
      conn.query(`SELECT phone
                  FROM parent
                    JOIN parent_child ON parent._id = parent_child.parent_id
                    AND child_id = ${regNo}
                  `,
          (err, data) => {
              if (err)
                  console.log("There is an error " + err);
              else {
                returnData(data[0].phone); //callback
                console.log("Parent phone number details " + data[0].phone);
              }
          });
  });
}
