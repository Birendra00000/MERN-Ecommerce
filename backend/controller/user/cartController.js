const Product = require("../../model/productModal");
const User = require("../../model/usermodel");

exports.addToCart = async (req, res) => {
  const userId = req.user.id;

  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({
      message: "Pleased Provide Id",
    });
  }
  const productExist = await Product.findById(productId);

  if (!productExist) {
    return res.status(400).json({
      message: "Product doesn't exist",
    });
  }

  const user = await User.findById(userId);
  user.cart.push(productId);
  await user.save();
  res.status(200).json({
    message: "Product is added successfully",
  });
};

exports.getMyCartItems = async (req, res) => {
  const userId = req.user.id;
  const userData = await User.findById(userId).populate("cart");

  res.status(200).json({
    message: "Cart Items fetched successfully",
    data: userData.cart, // Accessing the populated cart field directly
  });
};

exports.deleteCartItems = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  //check if that product exist or not

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(400).json({
      message: "Product with that Id doesnot exist",
    });
  }

  const user = await User.findById(userId);

  user.cart = user.cart.filter((productItemsId) => productItemsId != productId);

  await user.save();

  res.status(200).json({
    message: "Product deleted successfully from Cart",
  });
};
