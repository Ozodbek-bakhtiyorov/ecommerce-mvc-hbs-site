const { Router } = require("express");
const { User } = require("../models");
const router = Router();
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const {registerValidators,loginValidators} = require("../utils/validators");

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Register", isLogin: true, loginerror:req.flash("LoginError")});
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login#register");
});

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const comparePassword = bcrypt.compare(user.password,password);
      if (comparePassword) {
        req.session.user = user;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/");
        });
      } else {
        req.flash("LoginError", "Invalid Password");
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash("LoginError", "This user does note found");
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    console.log(error);
    req.flash("LoginError", error.message);
  }
});
router.post("/register",registerValidators,  async (req, res) => {
  try {
    const { email, password, name, confirm } = req.body;
    const errors= validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
      req.flash("regerror", errors.array()[0].msg);
      return res.status(422).render('auth/login', { title: "Register", isLogin: true, regerror:req.flash("regerror"), loginerror:req.flash("LoginError"),regdata:req.body});
    } 
    const hashpassword =await bcrypt.hash(password,10)
    const user = new User({
      name,
      email,
      password:hashpassword,
      cart: { items: [] },
    });
    await user.save();
    res.redirect("/auth/login#login");
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
