const AdminModel = require('./../../Model/AdminModel/admin');
const SlideModel=require('./../../Model/Common/slide');
const ServiceModel=require('./../../Model/Common/service');
const ClientModel=require('./../../Model/Common/client');
const FeatureModel=require('./../../Model/Common/feature');
const CategoryModel=require('./../../Model/Common/category');
const BlogModel=require('./../../Model/Common/blog');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const config = require('./../../Config/config');


const home = (req, res) => {
    res.render('Admin/home',{
        title:"Admin || Home",
        admin_name:req.admin.name
    });
};

const login = (req, res) => {
    res.render('Admin/login',{
        title: "Admin || Login",
        message:req.flash("message")
    });
};

const registration = (req, res) => {
    res.render('Admin/registration', {
        title: "Admin || Registration",
        message: req.flash("message")
    });
};

const signin = (req, res) => {
    AdminModel.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            if (bcryptjs.compareSync(req.body.password, data.password)) {
                const adminToken = jwt.sign({ id: data._id, name: data.name }, config.secret_jwt, { expiresIn: "1h" });
                res.cookie("adminToken", adminToken);
                console.log("Login successful....");
                res.redirect("/admin/dashboard");
            } else {
                console.log("Invalid password....");
                req.flash("message", "Invalid password....");
                res.redirect("/admin/login");
            }
        } else {
            console.log("Your email is not registered....");
            req.flash("message", "Your email is not registered....");
            res.redirect("/admin/login");
        }
    })
};

const signup = (req, res) => {
    AdminModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10))
    }).save((err, user) => {
        if (!err) {
            console.log("Registration Successfull........");
            req.flash("message", "Registration Successfull....")
            res.redirect("/admin/login");
        } else {
            console.log("Registration Not Successfull........", err);
            req.flash("message", "Registration Not Successfull....")
            res.redirect("/admin/registration");
        }
    })
}

const logout=(req,res)=>{
  res.clearCookie("adminToken");
  res.redirect("/admin/login")
}


const dashboard=(req,res)=>{
    res.render("Admin/dashboard",{
        title:"Admin || Dashboard",
        admin_name:req.admin.name
    });
};

const slide=(req,res)=>{
     SlideModel.find().exec((err,data)=>{
        if(!err){
            res.render("Admin/slide",{
                title:"Admin || Slide",
                admin_name:req.admin.name,
                allslide:data,
                message:req.flash("message")
            });
        }
     })

};

const add_slide_page=(req,res)=>{
    res.render("Admin/add_slide",{
        title:"Add || Slide",
        admin_name:req.admin.name
    })
}

const add_slide=(req,res)=>{
    SlideModel({
        name:req.body.name,
        content:req.body.content,
        image:req.file.filename
    }).save((err,data)=>{
        if(!err){
            console.log("Added data are ",data);
            req.flash("message","Data save successfully...")
            res.redirect("/admin/slide")
        }else{
            console.log("Data not save.... ",err);
            req.flash("message","Data not save.....")
            res.redirect("/admin/add-slide/page")
        }
    })
}

const edit_slide_page=(req,res)=>{
  SlideModel.findById(req.params.id).then(result=>{
    res.render("Admin/edit_slide",{
        title:"Admin || Slide_Upate",
        admin_name:req.admin.name,
        data:result
    })
  }).catch(err=>{
    console.log(err);
    res.redirect('/admin/slide')
  })
}

const edit_slide=(req,res)=>{
    SlideModel.findById(req.params.id).then(result=>{
        result.name=req.body.name,
        result.content=req.body.content,
        result.image=req.file.filename

        return result.save().then(result=>{
           console.log("Data updated successfully......");
           req.flash("message","Data updated successfully......")
           res.redirect("/admin/slide");
        }).catch(err=>{
        console.log("Data not updated......");
        req.flash("message","Data not updated......")
        res.redirect("/admin/slide");
        })
    }).catch(err=>{
     console.log("Data not found....",err);
    })
}

const delete_slide=(req,res)=>{
  SlideModel.deleteOne({_id:req.params.id}).then(result=>{
    console.log("Data deleted successfully....");
    req.flash("message","Data deleted successfully....")
    res.redirect("/admin/slide")
  }).catch(err=>{
    console.log("Data not deleted");
    req.flash("message","Data not deleted....")
    res.redirect("/admin/slide")
  })
}


const service=(req,res)=>{
     ServiceModel.find().exec((err,data)=>{
        if(!err){
            res.render("Admin/service",{
                title:"Admin || Service",
                admin_name:req.admin.name,
                allservice:data,
                message:req.flash("message")
            });
        }
     })

};

const add_service_page=(req,res)=>{
    res.render("Admin/add_service",{
        title:"Add || Service",
        admin_name:req.admin.name
    })
}

const add_service=(req,res)=>{
    ServiceModel({
        name:req.body.name,
        content:req.body.content,
    }).save((err,data)=>{
        if(!err){
            console.log("Added data are ",data);
            req.flash("message","Data save successfully...")
            res.redirect("/admin/service")
        }else{
            console.log("Data not save.... ",err);
            req.flash("message","Data not save.....")
            res.redirect("/admin/add-service/page")
        }
    })
}

const edit_service_page=(req,res)=>{
  ServiceModel.findById(req.params.id).then(result=>{
    res.render("Admin/edit_service",{
        title:"Admin || Service_Upate",
        admin_name:req.admin.name,
        data:result
    })
  }).catch(err=>{
    console.log(err);
    res.redirect('/admin/service')
  })
}

const edit_service=(req,res)=>{
    ServiceModel.findById(req.params.id).then(result=>{
        result.name=req.body.name,
        result.content=req.body.content

        return result.save().then(result=>{
           console.log("Data updated successfully......");
           req.flash("message","Data updated successfully......")
           res.redirect("/admin/service");
        }).catch(err=>{
        console.log("Data not updated......");
        req.flash("message","Data not updated......")
        res.redirect("/admin/service");
        })
    }).catch(err=>{
     console.log("Data not found....",err);
    })
}

const delete_service=(req,res)=>{
  ServiceModel.deleteOne({_id:req.params.id}).then(result=>{
    console.log("Data deleted successfully....");
    req.flash("message","Data deleted successfully....")
    res.redirect("/admin/service")
  }).catch(err=>{
    console.log("Data not deleted");
    req.flash("message","Data not deleted....")
    res.redirect("/admin/service")
  })
}

const client=(req,res)=>{
     ClientModel.find().exec((err,data)=>{
        if(!err){
            res.render("Admin/client",{
                title:"Admin || Client",
                admin_name:req.admin.name,
                allclient:data,
                message:req.flash("message")
            });
        }
     })

};

const add_client_page=(req,res)=>{
    res.render("Admin/add_client",{
        title:"Add || Client",
        admin_name:req.admin.name
    })
}

const add_client=(req,res)=>{
    ClientModel({
        name:req.body.name,
        image:req.file.filename
    }).save((err,data)=>{
        if(!err){
            console.log("Added data are ",data);
            req.flash("message","Data save successfully...")
            res.redirect("/admin/client")
        }else{
            console.log("Data not save.... ",err);
            req.flash("message","Data not save.....")
            res.redirect("/admin/add-client/page")
        }
    })
}

const edit_client_page=(req,res)=>{
  ClientModel.findById(req.params.id).then(result=>{
    res.render("Admin/edit_client",{
        title:"Admin || Client_Upate",
        admin_name:req.admin.name,
        data:result
    })
  }).catch(err=>{
    console.log(err);
    res.redirect('/admin/client')
  })
}

const edit_client=(req,res)=>{
    ClientModel.findById(req.params.id).then(result=>{
        result.name=req.body.name,
        result.image=req.file.filename

        return result.save().then(result=>{
           console.log("Data updated successfully......");
           req.flash("message","Data updated successfully......")
           res.redirect("/admin/client");
        }).catch(err=>{
        console.log("Data not updated......");
        req.flash("message","Data not updated......")
        res.redirect("/admin/client");
        })
    }).catch(err=>{
     console.log("Data not found....",err);
    })
}

const delete_client=(req,res)=>{
  ClientModel.deleteOne({_id:req.params.id}).then(result=>{
    console.log("Data deleted successfully....");
    req.flash("message","Data deleted successfully....")
    res.redirect("/admin/client")
  }).catch(err=>{
    console.log("Data not deleted");
    req.flash("message","Data not deleted....")
    res.redirect("/admin/client")
  })
}

const feature=(req,res)=>{
    FeatureModel.find().exec((err,data)=>{
       if(!err){
           res.render("Admin/feature",{
               title:"Admin || Feature",
               admin_name:req.admin.name,
               allfeature:data,
               message:req.flash("message")
           });
       }
    })

};

const add_feature_page=(req,res)=>{
   res.render("Admin/add_feature",{
       title:"Add || Feature",
       admin_name:req.admin.name
   })
}

const add_feature=(req,res)=>{
   FeatureModel({
       name:req.body.name,
   }).save((err,data)=>{
       if(!err){
           console.log("Added data are ",data);
           req.flash("message","Data save successfully...")
           res.redirect("/admin/feature")
       }else{
           console.log("Data not save.... ",err);
           req.flash("message","Data not save.....")
           res.redirect("/admin/add-feature/page")
       }
   })
}

const edit_feature_page=(req,res)=>{
 FeatureModel.findById(req.params.id).then(result=>{
   res.render("Admin/edit_feature",{
       title:"Admin || Feature_Upate",
       admin_name:req.admin.name,
       data:result
   })
 }).catch(err=>{
   console.log(err);
   res.redirect('/admin/feature')
 })
}

const edit_feature=(req,res)=>{
   FeatureModel.findById(req.params.id).then(result=>{
       result.name=req.body.name

       return result.save().then(result=>{
          console.log("Data updated successfully......");
          req.flash("message","Data updated successfully......")
          res.redirect("/admin/feature");
       }).catch(err=>{
       console.log("Data not updated......");
       req.flash("message","Data not updated......")
       res.redirect("/admin/feature");
       })
   }).catch(err=>{
    console.log("Data not found....",err);
   })
}

const delete_feature=(req,res)=>{
 FeatureModel.deleteOne({_id:req.params.id}).then(result=>{
   console.log("Data deleted successfully....");
   req.flash("message","Data deleted successfully....")
   res.redirect("/admin/feature")
 }).catch(err=>{
   console.log("Data not deleted");
   req.flash("message","Data not deleted....")
   res.redirect("/admin/feature")
 })
}

const category=(req,res)=>{
    CategoryModel.find().exec((err,data)=>{
       if(!err){
           res.render("Admin/category",{
               title:"Admin || Category",
               admin_name:req.admin.name,
               allcategory:data,
               message:req.flash("message")
           });
       }
    })

};

const add_category_page=(req,res)=>{
    res.render("Admin/add_category",{
        title:"Add || Category",
        admin_name:req.admin.name
    })
 }

 const add_category=(req,res)=>{
    CategoryModel({
        name:req.body.name,
    }).save((err,data)=>{
        if(!err){
            console.log("Added data are ",data);
            req.flash("message","Data save successfully...")
            res.redirect("/admin/category")
        }else{
            console.log("Data not save.... ",err);
            req.flash("message","Data not save.....")
            res.redirect("/admin/add-category/page")
        }
    })
 };

 const edit_category_page=(req,res)=>{
    CategoryModel.findById(req.params.id).then(result=>{
      res.render("Admin/edit_category",{
          title:"Admin || Category_Upate",
          admin_name:req.admin.name,
          data:result
      })
    }).catch(err=>{
      console.log(err);
      res.redirect('/admin/category')
    })
   };

   const edit_category=(req,res)=>{
    CategoryModel.findById(req.params.id).then(result=>{
        result.name=req.body.name
 
        return result.save().then(result=>{
           console.log("Data updated successfully......");
           req.flash("message","Data updated successfully......")
           res.redirect("/admin/category");
        }).catch(err=>{
        console.log("Data not updated......");
        req.flash("message","Data not updated......")
        res.redirect("/admin/category");
        })
    }).catch(err=>{
     console.log("Data not found....",err);
    })
 };

 const delete_category=(req,res)=>{
    CategoryModel.deleteOne({_id:req.params.id}).then(result=>{
      console.log("Data deleted successfully....");
      req.flash("message","Data deleted successfully....")
      res.redirect("/admin/category")
    }).catch(err=>{
      console.log("Data not deleted");
      req.flash("message","Data not deleted....")
      res.redirect("/admin/category")
    })
   };

   const blog=(req,res)=>{
    BlogModel.find().populate("category").exec((err,data)=>{
       if(!err){
           res.render("Admin/blog",{
               title:"Admin || Blog",
               admin_name:req.admin.name,
               allblog:data,
               message:req.flash("message")
           });
       }
    })

};

const add_blog_page=(req,res)=>{
    CategoryModel.find().exec((err,data)=>{
       if(!err){
        res.render("Admin/add_blog",{
            title:"Add || Blog",
            admin_name:req.admin.name,
            categorise:data
        })
       }
    })
    
 };


 const add_blog=(req,res)=>{
    BlogModel({
        category:req.body.category,
        title:req.body.title,
        content:req.body.content,
        image:req.file.filename
    }).save((err,data)=>{
        if(!err){
            console.log("Added data are ",data);
            req.flash("message","Data save successfully...")
            res.redirect("/admin/blog")
        }else{
            console.log("Data not save.... ",err);
            req.flash("message","Data not save.....")
            res.redirect("/admin/add-blog/page")
        }
    })
};

const edit_blog_page=(req,res)=>{
    BlogModel.findById(req.params.id).populate("category").then(result=>{
     CategoryModel.find().exec((err,data)=>{
        if(!err){
            res.render("Admin/edit_blog",{
                title:"Admin || Blog_Upate",
                admin_name:req.admin.name,
                data:result,
                categorise:data
            })
        }
     })
    }).catch(err=>{
      console.log(err);
      res.redirect('/admin/blog')
    })
  };

  const edit_blog=(req,res)=>{
    BlogModel.findById(req.params.id).populate("category").then(result=>{
        result.title=req.body.title,
        result.content=req.body.content,
        result.category=req.body.category,
        result.image=req.file.filename

        return result.save().then(result=>{
           console.log("Data updated successfully......");
           req.flash("message","Data updated successfully......")
           res.redirect("/admin/blog");
        }).catch(err=>{
        console.log("Data not updated......");
        req.flash("message","Data not updated......")
        res.redirect("/admin/blog");
        })
    }).catch(err=>{
     console.log("Data not found....",err);
    })
};

const delete_blog=(req,res)=>{
    BlogModel.deleteOne({_id:req.params.id}).then(result=>{
      console.log("Data deleted successfully....");
      req.flash("message","Data deleted successfully....")
      res.redirect("/admin/blog")
    }).catch(err=>{
      console.log("Data not deleted");
      req.flash("message","Data not deleted....")
      res.redirect("/admin/blog")
    })
   };




module.exports = ({
    home,
    login,
    registration,
    signin,
    signup,
    logout,
    dashboard,
    slide,
    add_slide_page,
    add_slide,
    edit_slide_page,
    edit_slide,
    delete_slide,
    service,
    add_service_page,
    add_service,
    edit_service_page,
    edit_service,
    delete_service,
    client,
    add_client_page,
    add_client,
    edit_client_page,
    edit_client,
    delete_client,
    feature,
    add_feature_page,
    add_feature,
    edit_feature_page,
    edit_feature,
    delete_feature,
    category,
    add_category_page,
    add_category,
    edit_category_page,
    edit_category,
    delete_category,
    blog,
    add_blog_page,
    add_blog,
    edit_blog_page,
    edit_blog,
    delete_blog
    
})