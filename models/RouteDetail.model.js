const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let Stop = new Schema({
       Lat : {type:Number},
       Long : {type:Number},
       StudentsId : [Schema.Types.ObjectId],

});


let RouteDetailsSchema = new Schema({
       Stops : [Stop]
});


//Expoting the model
module.exports = Mongoose.model('RouteDetail', RouteDetailsSchema);
