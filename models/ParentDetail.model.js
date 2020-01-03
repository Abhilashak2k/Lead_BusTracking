const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ParentDetailSchema = new Schema ({
    Name:{type: String, required: true, max: 100},
    Phone:{type: Number, required: true},
    Email:{type:String ,require :true},
    ChildId:{type: Schema.Types.ObjectId, ref: 'ChildDetail', required: true,index:true}

});

//Expoting the model
module.exports = mongoose.model('ParentDetail', ParentDetailSchema);