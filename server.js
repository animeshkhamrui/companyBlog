const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const session=require('express-session')
const flash=require('connect-flash')
const cookie=require('cookie-parser');
const app=express();
require('dotenv').config();
const port=process.env.PORT || 2000;

app.set('view engine','ejs');
app.set('views','Views');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'Public')));
app.use('/Upload',express.static(path.join(__dirname,'Upload')));


app.use(session({
  secret:"Animesh",
  cookie: {maxAge:60000},
  saveUninitialized:false,
  resave:false
}));

app.use(flash());

app.use(cookie());

//Import Routes:-
const userRoute=require('./Route/UserRoute/userRoute');
app.use(userRoute);

const adminRoute=require('./Route/AdminRoute/adminRoute');
app.use('/admin',adminRoute);

//Database Connection:-

const db="mongodb+srv://company25121997:3PfPgeMHSa6BIQRt@cluster0.v9qcfs2.mongodb.net/project";

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    app.listen(port,(err)=>{
        if(!err){
         console.log(`My Server is connected at http://localhost:${port}`);
        }else{
         console.log(err);
        }
    })
}).catch(error=>{
    console.log(error);
})





