const dbquery = require('./dbquery');
const client = require('./redisClient');

exports.GetAllStops = (req, res) => {

    let routeid = req.body.route_id;
    client.lrange(routeid, 0, -1, function (error, result) {
        if (error) console.error();
        if (result && result.length) {
            console.log("from redis");
            res.send(result);

        }
        else{
            console.log("nothing found in redis, going to DB");
            dbquery.getStopsFromDB(req, res);
        }

    });

}
exports.GetCurrentTrail = (req,res)=>{

    let roomid = req.body.room_id;
    client.lrange(roomid, 0, -1, function (error, result) {
        if (error) throw error;
        if (result && result.length) {
            console.log("from redis");
            res.send(result);
        }
        else {
            console.log("nothing in redis... so oops!");
            res.sendStatus(404);
        }
});

}
