const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const mongose_paginate_v2=require('mongoose-paginate-v2');

const blog=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    }
},
 {timestamps:true}
);

blog.plugin(mongose_paginate_v2);

module.exports=mongoose.model('blog',blog);