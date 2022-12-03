const jwt = require('jsonwebtoken');
const config = require('./../../Config/config');


exports.userauth = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, config.secret_jwt, (err, data) => {
            req.user = data;
            if (req.user) {
                next();
            } else {
                console.log("Hey, Please login before enter blog.......");
                req.flash("message","Hey, Please login before enter blog.......")
                res.redirect("/login")
            };
        })
    } else {
        console.log("Hey, Please login before enter blog.......");
        req.flash("message","Hey, Please login before enter blog.......")
        res.redirect("/login")
    }
}