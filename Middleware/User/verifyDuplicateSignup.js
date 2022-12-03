const UserModel = require("./../../Model/UserModel/user");

exports.verifyDuplicateSignup = (req, res, next) => {
  UserModel.findOne({ name: req.body.name }).exec((err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/registration");
    }

    if (user) {

      console.log("Name is already exits please give a different name.....");
      req.flash("message", "Name is already exits please give a different name.....")
      res.redirect("/registration");

    } else {
      UserModel.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/registration");
        }

        if (user) {

          console.log("Email is already exits please give a different email....");
          req.flash("message", "Email is already exits please give a different email....")
          res.redirect("/registration");

        } else {
          UserModel.findOne({ mobile: req.body.mobile }).exec((err, user) => {

            if (err) {
              console.log(err);
              res.redirect("/registration");
            }

            if (user) {

              console.log("Phone number already exits please give a different phone number....");
              req.flash("message", "Phone number already exits please give a different phone number....")
              res.redirect("/registration");
            } else {
              const password = req.body.password;
              const cpassword = req.body.cpassword;
              if (password !== cpassword) {
                console.log("Psssword and confirm Password not match....");
                req.flash("message", "Psssword and confirm Password not match....")
                res.redirect("/registration");
              } else {
                next();
              }
            }

          });
        }

      });
    }


  });
};
