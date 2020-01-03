const moongoose = require('mongoose');
const Schema = moongoose.Schema;

let ConductorDetailSchema = new Schema({
Name : {type:String},
Phone : {type:Number},
PresentBusId: {type: Schema.Types.ObjectId, ref: 'BusDetail', required: true,index:true},
PresentRouteId:{type: Schema.Types.ObjectId, ref: 'RouteDetail', required: true,index:true} 

});

module.exports = moongoose.model('ConductorDetail',ConductorDetailSchema);