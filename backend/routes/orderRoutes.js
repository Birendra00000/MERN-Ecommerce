const {
  getMyOrders,
  createOrder,
  cancelOrder,
  updateMyOrder,
  deleteMyOrder,
} = require("../controller/user/order/order");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/order")
  .get(isAuthenticated, catchAsync(getMyOrders))
  .post(isAuthenticated, catchAsync(createOrder));
router.route("/cancel").patch(isAuthenticated, catchAsync(cancelOrder));
router
  .route("order/:id")
  .patch(isAuthenticated, catchAsync(updateMyOrder))
  .delete(isAuthenticated, catchAsync(deleteMyOrder));

module.exports = router;
