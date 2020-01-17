const DB = require('./dbconnection')
const poolDB = DB.poolDB;
exports.UpdateConductorRouteInfo = (req, res) => {

    let busno = req.body.BusNo;
    let shift = req.body.Shift;

    poolDB.getConnection(function(err, conn) {

        conn.query(`SELECT _id
                    FROM   route
                    WHERE  bus_id = ${busno}
                    AND    shift = "${shift}"`, (err, data) => {
            if (err)
                console.log(err);
            else {
                console.log("SQL query result is " + data[0]._id);
                res.send((data[0]._id).toString());
            }
        })
    });
}


exports.UpdateParentRouteInfo = (req, res) => {

    let parent_no = req.body.PhNo;

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
                    console.log(data);
                    res.send(data);
                }
            })

    });
}

exports.FindParentSendNotification = (req, res) => {
    let regNo = req.body.RegNo;
    console.log("Entered roll no is " + regNo);
    poolDB.getConnection((err, conn) => {
        conn.query(`SELECT phone
                    FROM parent
                      JOIN parent_child ON parent._id = parent_child.parent_id
                      AND child_id = $ { regNo }
                    `,
            (err, data) => {
                if (err)
                    console.log("There is an error " + err);
                else {
                    console.log("\nQuery result of FindParentSendNotification " + data[0].phone);
                    res.send(data[0].phone);
                }
            });
    });
}
