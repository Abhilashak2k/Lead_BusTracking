const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Shift = new Schema({
    Schedule : {type:String},
    RouteId:{type: Schema.Types.ObjectId, ref: 'RouteDetail', required: true,index:true},
    Active:{type:Boolean, default:true}        
});

let BusDetailSchema = new Schema ({
    PresentLat:{type: Number, required: true, max: 100},
    PresentLong:{type: Number, required: true},
    BusNo: {type:String,required:true},
    LastCordinateUpdTimeStamp:{type:Date},
    Shift: [Shift]
    
});


//Expoting the model
module.exports = mongoose.model('BusDetail', BusDetailSchema);