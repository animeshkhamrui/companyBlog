const mongoose=require('mongoose');

const service=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    }
},
 {timestamps:true}
);

module.exports=mongoose.model('service',service);