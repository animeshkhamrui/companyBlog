const express=require('express');
const multer=require('multer')
const path=require('path');
const route=express.Router();
const adminController=require('../../Controller/AdminController/adminController');
const verifyDuplicateSignup=require('./../../Middleware/Admin/verifyDuplicateSignup');
const adminAuth=require('./../../Middleware/Admin/adminAuth');

const slide_image_storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname,'./../../Upload/SlideImage'),function(error,success){
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

const slide_image_upload=multer({storage:slide_image_storage});

const client_image_storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname,'./../../Upload/ClientImage'),function(error,success){
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

const client_image_upload=multer({storage:client_image_storage});

const blog_image_storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname,'./../../Upload/BlogImage'),function(error,success){
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

const blog_image_upload=multer({storage:blog_image_storage});

route.get('/dashboard',adminAuth.adminauth,adminController.dashboard);
route.get('/login',adminController.login);
// route.get('/registration',adminController.registration);
route.post('/signin',adminController.signin);
// route.post('/signup',verifyDuplicateSignup.verifyDuplicateSignup,adminController.signup);
route.get('/blog',adminAuth.adminauth,adminController.blog);
route.get('/blog',adminAuth.adminauth,adminController.blog);
route.get('/logout',adminController.logout);


route.get('/slide',adminAuth.adminauth,adminController.slide);
route.get('/add-slide/page',adminAuth.adminauth,adminController.add_slide_page);
route.post('/add-slide/content',slide_image_upload.single("s_image"),adminController.add_slide);
route.get('/edit-slide/page/:id',adminAuth.adminauth,adminController.edit_slide_page);
route.post('/edit-slide/content/:id',slide_image_upload.single("s_image"),adminController.edit_slide);
route.get('/delete-slide/:id',adminController.delete_slide);

route.get('/service',adminAuth.adminauth,adminController.service);
route.get('/add-service/page',adminAuth.adminauth,adminController.add_service_page);
route.post('/add-service/content',adminController.add_service);
route.get('/edit-service/page/:id',adminAuth.adminauth,adminController.edit_service_page);
route.post('/edit-service/content/:id',adminController.edit_service);
route.get('/delete-service/:id',adminController.delete_service);

route.get('/client',adminAuth.adminauth,adminController.client);
route.get('/add-client/page',adminAuth.adminauth,adminController.add_client_page);
route.post('/add-client/content',client_image_upload.single("c_image"),adminController.add_client);
route.get('/edit-client/page/:id',adminAuth.adminauth,adminController.edit_client_page);
route.post('/edit-client/content/:id',client_image_upload.single("c_image"),adminController.edit_client);
route.get('/delete-client/:id',adminController.delete_client);

route.get('/feature',adminAuth.adminauth,adminController.feature);
route.get('/add-feature/page',adminAuth.adminauth,adminController.add_feature_page);
route.post('/add-feature/content',adminController.add_feature);
route.get('/edit-feature/page/:id',adminAuth.adminauth,adminController.edit_feature_page);
route.post('/edit-feature/content/:id',adminController.edit_feature);
route.get('/delete-feature/:id',adminController.delete_feature);

route.get('/category',adminAuth.adminauth,adminController.category);
route.get('/add-category/page',adminAuth.adminauth,adminController.add_category_page);
route.post('/add-category/content',adminController.add_category);
route.get('/edit-category/page/:id',adminAuth.adminauth,adminController.edit_category_page);
route.post('/edit-category/content/:id',adminController.edit_category);
route.get('/delete-category/:id',adminController.delete_category);

route.get('/blog',adminAuth.adminauth,adminController.blog);
route.get('/add-blog/page',adminAuth.adminauth,adminController.add_blog_page);
route.post('/add-blog/content',blog_image_upload.single("b_image"),adminController.add_blog);
route.get('/edit-blog/page/:id',adminAuth.adminauth,adminController.edit_blog_page);
route.post('/edit-blog/content/:id',blog_image_upload.single("b_image"),adminController.edit_blog);
route.get('/delete-blog/:id',adminController.delete_blog);


module.exports=route;
