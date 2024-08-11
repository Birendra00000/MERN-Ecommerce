const {
  initialKhaltiPayment,
  verifiedPayment,
} = require("../controller/user/payment/payment");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/payment")
  .post(isAuthenticated, catchAsync(initialKhaltiPayment));
router.route("/verified").post(catchAsync(verifiedPayment));

module.exports = router;
