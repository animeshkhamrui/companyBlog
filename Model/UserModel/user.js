const mongoose=require('mongoose');

const user=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    }
},
{ timestamps: true }
);

module.exports=mongoose.model("user",user);