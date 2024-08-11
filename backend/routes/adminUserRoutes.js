const {
  getUsers,
  deleteUsers,
} = require("../controller/admin/user/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const { restrictTo } = require("../middleware/restricTo");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/getUsers")
  .get(isAuthenticated, restrictTo("Admin"), catchAsync(getUsers));

router
  .route("/getUsers/:id")
  .delete(isAuthenticated, restrictTo("Admin"), catchAsync(deleteUsers));

module.exports = router;
