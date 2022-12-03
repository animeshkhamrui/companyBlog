const express=require('express');
const multer=require('multer')
const path=require('path')
const route=express.Router();
const userController=require('./../../Controller/UserController/userController');
const verifyDuplicateSignup=require('./../../Middleware/User/verifyDuplicateSignup')
const userAuth=require('./../../Middleware/User/userAuth');


const user_image_storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname,'./../../Upload/UserImage'),function(error,success){
          if(error) throw error;
      })
    },
  
    filename:function(req,file,cb){
      const name=file.originalname;
      cb(null,name,function(error1,success){
          if(error1) throw error1;
      })
    }
  });

const user_image_upload=multer({storage:user_image_storage});

route.get('/',userController.home);
route.get('/about',userController.about);
route.get('/blog',userAuth.userauth,userController.blog);
route.get('/blog-search',userAuth.userauth,userController.blog_search);
route.get('/blog-category/:id',userAuth.userauth,userController.blog_category);
route.get('/single_blog',userAuth.userauth,userController.single_blog);
route.get('/services',userController.services);
route.get('/registration',userController.registration);
route.get('/login',userController.login);
route.get('/contact',userController.contact);
route.post('/signin',userController.signin);
route.post('/signup',user_image_upload.single('u_image'),verifyDuplicateSignup.verifyDuplicateSignup,userController.signup);



module.exports=route;