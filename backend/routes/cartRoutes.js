const {
  addToCart,
  getMyCartItems,
  deleteCartItems,
} = require("../controller/user/cartController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/cartItem").get(isAuthenticated, catchAsync(getMyCartItems));
router
  .route("/cart/:id")
  .post(isAuthenticated, catchAsync(addToCart))
  .delete(isAuthenticated, catchAsync(deleteCartItems));

module.exports = router;
