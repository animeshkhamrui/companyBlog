const jwt = require('jsonwebtoken');
const config = require('./../../Config/config');


exports.adminauth = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, config.secret_jwt, (err, data) => {
            req.admin = data;
            if (req.admin) {
                next();
            } else {
                console.log("Hey, Please login before enter admin.......");
                req.flash("message","Hey, Please login before enter admin.......")
                res.redirect("/admin/login")
            };
        })
    } else {
        console.log("Hey, Please login before enter admin.......");
        req.flash("message","Hey, Please login before enter admin.......")
        res.redirect("/admin/login")
    }
}