const {
  userRegister,
  userLogin,
  forgotPassword,
  otpChecked,
  changePassword,
} = require("../controller/authController/authController");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/register").post(catchAsync(userRegister));
router.route("/login").post(catchAsync(userLogin));
router.route("/forgotpassword").post(catchAsync(forgotPassword));
router.route("/otpChecked").post(catchAsync(otpChecked));
router.route("/changePassword").post(catchAsync(changePassword));

module.exports = router;
