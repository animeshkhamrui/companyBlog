const mongoose=require('mongoose');

const category=mongoose.Schema({
    name:{
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

module.exports=mongoose.model('category',category);