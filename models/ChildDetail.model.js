const moongoose = require('mongoose');
const Schema = moongoose.Schema;


let ChildDetailSchema = new Schema({
Name : {type:String, required:true},
RegNo : {type:String, required:true},
ParentId : {type: Schema.Types.ObjectId, ref: 'ParentDetail', required: true},
BusId: {type: Schema.Types.ObjectId, ref: 'BusDetail', required: true},
RouteId:{type: Schema.Types.ObjectId, ref: 'RouteDetail', required: true,index:true} 
});


module.exports = moongoose.model('ChildDetail',ChildDetailSchema);

