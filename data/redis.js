const dbquery = require('./dbquery');
const client = require('./redisClient');

exports.getallstops = (req, res) => {

    let routeid = req.body.route_id;
    client.lrange(routeid, 0, -1, function (error, result) {
        if (error) console.error();
        if (result && result.length) {
            console.log("from redis");
            res.send(result);

        }
        else{

            dbquery.getStopsFromDB(req, res);
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
