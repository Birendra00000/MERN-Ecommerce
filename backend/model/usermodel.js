const Product = require("./productModal");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "userName must be provided."],
  },
  userEmail: {
    type: String,
    required: [true, "Email must be provided."],
  },
  userPhoneNumber: {
    type: Number,
    required: [true, "Phone number musr be provided."],
  },

  userPassword: {
    type: String,
    required: [true, "Password must be provided"],
  },
  role: {
    type: String,
    enum: ["Customer", "Admin"],
    default: "Admin",
  },

  OTP: {
    type: String,
  },

  isOtpVerified: {
    type: Boolean,
    default: false,
  },

  cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
