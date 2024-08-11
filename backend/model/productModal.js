const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name must be provided"],
    },
    productDescription: {
      type: String,
      required: [true, "Product Description must be provided"],
    },
    productQuantity: {
      type: Number,
      required: [true, "Product Quantity must be provided"],
    },
    productPrice: {
      type: Number,
      required: [true, "Product price must be provided"],
    },
    productStatus: {
      type: String,
      emum: ["available", "unavailable"],
      default: "available",
    },
    productImage: String,
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
