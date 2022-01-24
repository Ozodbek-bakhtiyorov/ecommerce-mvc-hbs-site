const { check } = require("express-validator");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const registerValidators = [
  check("email")
    .isEmail()
    .withMessage(
      "Error with Email filed. Enter Your Email liek example@gmail.com"
    )
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email Is Already Exist!");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail()
    .trim(),
  check("password")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password Should be min 6 symbols"),
  check("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm Password is not valid!");
    }
    return true;
  }),
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name should be minimum 3 symbols")
    .trim(),
];
const notebookValidators = [
  check("title")
    .isLength({ min: 5 })
    .withMessage("Your title must be minimum 5 symbols!")
    .trim(),
  check("price")
    .isNumeric()
    .withMessage("Write correct Price. This input accepts only numbers")
    .trim(),
  check("img").isURL().withMessage("Write correct img url").trim(),
];

const loginValidators = [
  check("email")
    .isEmail()
    .withMessage(
      "Error with Email filed. Enter Your Email liek example@gmail.com "
    )
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject(
            "Your Email Not Found.Check your Email or register now!"
          );
        }
      } catch (e) {
        console.log(e);
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password Should be min 6 symbols")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          const comparePassword = bcrypt.compare(user.password, value);
          if (!comparePassword) {
            return  Promise.reject("Wrong Password!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }),
];
module.exports = {
  registerValidators,
  notebookValidators,
  loginValidators,
};
