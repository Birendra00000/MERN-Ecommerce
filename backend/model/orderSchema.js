const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: [
      {
        quantity: {
          type: Number,
          required: true,
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["pending,cancelled,delivered"],
      default: "pending",
    },

    paymentDetails: {
      pidx: { type: String },
      method: { type: String, enum: ["Cash on Delivery", "esewa"] },
      status: { type: String, enum: ["success,failed,pending"] },
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
