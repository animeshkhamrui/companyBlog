const AdminModel = require("./../../Model/AdminModel/admin");

exports.verifyDuplicateSignup = (req, res, next) => {
  AdminModel.findOne({ name: req.body.name }).exec((err, admin) => {
    if (err) {
      console.log(err);
      res.redirect("/admin/registration");
    }

    if (admin) {

      console.log("Name is already exits please give a different name.....");
      req.flash("message", "Name is already exits please give a different name.....")
      res.redirect("/admin/registration");

    } else {
      AdminModel.findOne({ email: req.body.email }).exec((err, admin) => {
        if (err) {
          console.log(err);
          res.redirect("/admin/registration");
        }

        if (admin) {

          console.log("Email is already exits please give a different email....");
          req.flash("message", "Email is already exits please give a different email....")
          res.redirect("/admin/registration");

        } else {
          AdminModel.findOne({ mobile: req.body.mobile }).exec((err, admin) => {

            if (err) {
              console.log(err);
              res.redirect("/admin/registration");
            }

            if (admin) {

              console.log("Phone number already exits please give a different phone number....");
              req.flash("message", "Phone number already exits please give a different phone number....")
              res.redirect("/admin/registration");
            } else {
              const password = req.body.password;
              const cpassword = req.body.cpassword;
              if (password !== cpassword) {
                console.log("Psssword and confirm Password not match....");
                req.flash("message", "Psssword and confirm Password not match....")
                res.redirect("/admin/registration");
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
