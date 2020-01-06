const mysql = require('mysql');

const poolDB = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "root",
    password: "",
    database: "bustracking"
});


exports.UpdateConductorRouteInfo = (req, res) => {

    var busno = req.body.BusNo;
    var shift = req.body.Shift;

    poolDB.getConnection(function(err, conn) {

        conn.query(`SELECT route_id
                    FROM   route
                    WHERE  bus_id = ${busno}
                    AND    shift = "${shift}"`, (err, data) => {
            if (err)
                console.log(err);
            else {
                console.log("SQL query result is " + data[0].route_id);
                res.status(200).send((data[0].route_id).toString());
            }
        })
    });
}


exports.UpdateParentRouteInfo = (req, res) => {

    var parent_no = req.body.PhNo;

    poolDB.getConnection((err, conn) => {

        conn.query(`SELECT *
                    FROM   student
                    WHERE  _id IN (SELECT child_id
                                  FROM   parent_child
                                  WHERE  parent_id = (SELECT _id
                                                      FROM   parent
                                                      WHERE  phone = "${parent_no}")) `, (err, data) => {
            if (err)
                console.log("There is an error " + err);
            else {
                console.log(data);
                res.send(data);
            }
        })

    });
}
