const poolDB = require('./dbconnection').poolDB;
const redis = require('redis');

const client = redis.createClient();
var multi = client.multi();

client.on('connect', function () {
    console.log('connected');
})

client.on('error', function () {
    console.log('error socket');
})

console.time('here');


exports.getallstops = (req, res) => {

    let routeid = req.body.route_id;
    client.lrange(routeid, 0, -1, function (error, result) {
        if (error) console.error();
        if (result && result.length) {
            console.log("from redis");
            res.send(result);

        }
        else {


            poolDB.getConnection(function (err, conn) {

                conn.query(`SELECT route_id,lat,lang from stop_route INNER JOIN bus_stops WHERE stop_route.stop_id=bus_stops._id AND route_id= ${routeid}`, (err, data) => {
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

                        res.send(routearray);
                        console.timeEnd('here');
                    }
                })
            });

        }
    });

}


exports.getcurrenttrail = (req,res)=>{

    let roomid = req.body.room_id;
    client.lrange(roomid, 0, -1, function (error, result) {
        if (error) throw error;
        if (result && result.length) {
            console.log("from redis");
            res.send(result);

        }
        else {
            res.sendStatus(404);
        }


});

}
