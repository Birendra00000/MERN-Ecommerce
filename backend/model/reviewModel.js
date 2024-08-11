const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewModal = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: [true, "A review must belongs to Users"],
  },

  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: [true, "A review must be of product"],
  },
  rating: {
    type: Number,
    default: 3,
  },
  message: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewModal);

module.exports = Review;
