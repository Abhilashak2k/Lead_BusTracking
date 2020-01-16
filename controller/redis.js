const redis = require('redis');

const client = redis.createClient();

client.on('connect',function(){
    console.log('connected');

})

client.on('error',function(){
    console.log('error');
})

client.lrange("t2",0,-1, function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }

    if(result && result.length)
    {
        console.log(result);
    console.log(typeof(result));
    result.forEach((value)=>{
        console.log(value);});
    }
    console.log("empty");   

    

});

// exports.getbusstoplist = (req,res) => {
     
//      //approach 1

//      let routeid = req.body.routedid;
//      client.llen

//      client.llen(routeid, function (error, result) {
//         if (error) {
//             console.log(error);
//             throw error;
//         }
//         console.log('GET result ->' + result);
//     });

// }



