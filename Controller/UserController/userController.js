const UserModel = require('./../../Model/UserModel/user');
const SlideModel = require('./../../Model/Common/slide');
const ServiceModel = require('./../../Model/Common/service');
const ClientModel = require('./../../Model/Common/client');
const FeatureModel = require('./../../Model/Common/feature');
const CategoryModel = require('./../../Model/Common/category');
const BlogModel = require('./../../Model/Common/blog');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const config = require('./../../Config/config');



const home = (req, res) => {
    SlideModel.find().then(slides => {
        ServiceModel.find().then(services => {
            ClientModel.find().then(clients => {
                res.render('User/home', {
                    title: "Home",
                    slides: slides,
                    services: services,
                    clients: clients
                })
            }).catch(err => {
                console.log("Clients not found......", err);
            })
        }).catch(err => {
            console.log("Services not found......", err);
        })
    }).catch(err => {
        console.log("Slides not found....", err);
    })

};

const about = (req, res) => {
    ClientModel.find().then(clients => {
        res.render('User/about', {
            title: "About",
            clients: clients
        })
    }).catch(err => {
        console.log("Clients not found....", err);
    })
};

const blog = (req, res) => {
    const pager = req.query.page ? req.query.page : 1
    const options = {
        page: pager,
        limit: 3,
        collation: {
          locale: 'en',
        },
      };
    BlogModel.paginate({}, options).then(data => {
        CategoryModel.find().then(categorise => {
            BlogModel.aggregate([{ $sort: { createdAt: -1 } }, { $limit: 5 }]).then(blogs2 => {
                res.render('User/blog', {
                    title: "Blog",
                    data: data,
                    categorise: categorise,
                    recentblogs: blogs2,
                    pager:pager
                })
            }).catch(err => {
                console.log("Recent blogs not found....");
            })
        }).catch(err => {
            console.log("Category not found...");
        })
    }).catch(err => {
        console.log("Blogs not found.....");
    })
};

const blog_search = (req, res) => {
    var search = req.body.search
    BlogModel.find(
        { "title": { $regex: ".*" + search + ".*" } }).then(blogs => {
            CategoryModel.find().then(categorise => {
                BlogModel.aggregate([{ $sort: { createdAt: -1 } }, { $limit: 5 }]).then(blogs2 => {
                    res.render('User/blog_search', {
                        title: "Blog",
                        searchblogs: blogs,
                        categorise: categorise,
                        recentblogs: blogs2
                    })
                    // console.log(blogs,categorise,blogs2);
                }).catch(err => {
                    console.log("Recent blogs not found....");
                })
            }).catch(err => {
                console.log("Category not found...");
            })

        }).catch(err => {
            console.log("Blogs not found....");
        })
}

const blog_category = (req, res) => {
    BlogModel.find({category:req.params.id}).then(blogs => {
            CategoryModel.find().then(categorise => {
                BlogModel.aggregate([{ $sort: { createdAt: -1 } }, { $limit: 5 }]).then(blogs2 => {
                    res.render('User/cat_blog', {
                        title: "Blog",
                        catblogs: blogs,
                        categorise: categorise,
                        recentblogs: blogs2
                    })
                    console.log(blogs);
                }).catch(err => {
                    console.log("Recent blogs not found....");
                })
            }).catch(err => {
                console.log("Category not found...");
            })

        }).catch(err => {
            console.log("Blogs not found....");
        })
}

const single_blog = (req, res) => {
    res.render('User/single_blog', {
        title: "Single_Blog"
    })
};

const services = (req, res) => {
    ServiceModel.find().then(services => {
        FeatureModel.find().then(features => {
            res.render('User/services', {
                title: "Services",
                services: services,
                features: features
            })
        }).catch(err => {
            console.log("Features not found......", err);
        })
    }).catch(err => {
        console.log("Services not found......", err);
    })
};

const contact = (req, res) => {
    res.render('User/contact', {
        title: "Contact"
    })
};

const registration = (req, res) => {
    res.render('User/registration', {
        title: "Registration",
        message: req.flash("message")
    })
};

const login = (req, res) => {
    loginData = {};
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined;
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined;
    res.render('User/login', {
        title: "Login",
        logindata: loginData,
        message: req.flash("message")
    })
};

const signup = (req, res) => {
    UserModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        image: req.file.filename,
        password: bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10))
    }).save((err, user) => {
        if (!err) {
            console.log("Registration Successfull........");
            req.flash("message", "Registration Successfull....")
            res.redirect("/login");
        } else {
            console.log("Registration Not Successfull........", err);
            req.flash("message", "Registration Not Successfull....")
            res.redirect("/registration");
        }
    })
}

const signin = (req, res) => {
    UserModel.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            if (bcryptjs.compareSync(req.body.password, data.password)) {
                const userToken = jwt.sign({ id: data._id, name: data.name }, config.secret_jwt, { expiresIn: "1h" });
                res.cookie("userToken", userToken);
                if (req.body.remember) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log("Login successful....");
                res.redirect("/blog");
            } else {
                console.log("Invalid password....");
                req.flash("message", "Invalid password....");
                res.redirect("/login");
            }
        } else {
            console.log("Your email is not registered....");
            req.flash("message", "Your email is not registered....");
            res.redirect("/registration");
        }
    })
};


module.exports = ({
    home,
    about,
    blog,
    blog_search,
    blog_category,
    single_blog,
    services,
    contact,
    registration,
    login,
    signup,
    signin
});