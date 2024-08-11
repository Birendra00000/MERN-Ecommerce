const Product = require("../../model/productModal");
const Review = require("../../model/reviewModel");

exports.createReview = async (req, res) => {
  const userId = req.user.id;
  console.log(req.body);
  const { rating, message } = req.body;

  const productId = req.params.id;

  if (!rating || !message || !productId) {
    return res.status(400).json({
      message: "Pleased provide rating,message,productId",
    });
  }

  const productExist = await Product.findById(productId);

  if (!productExist) {
    return res.status(404).json({
      message: "Product with that Id doesnot exists",
    });
  }

  await Review.create({
    userId,
    rating,
    message,
    productId,
  });
  res.status(200).json({
    message: "Review created successfully",
  });
};

exports.getProductReview = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({
      message: " Pleased provide ProductId",
    });
  }

  const productExist = await Product.findById(productId);

  if (!productExist) {
    return res.status(400).json({
      message: "Product with that Id doesnot exists",
    });
  }

  const review = await Review.find({ productId }).populate({
    path: "userId",
    select: "userName userEmail",
  });

  res.status(200).json({
    message: "Review fetched successfully",
    data: review,
  });
};

exports.deleteProductReview = async (req, res) => {
  const reviewId = req.params.id;

  if (!reviewId) {
    return res.status(400).json({
      message: "Pleased provide reviewId",
    });
  }

  //Check if that userId exist or not

  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(400).json({
      message: "User with that Id doesn't Exist",
    });
  } else {
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({
      message: "User deleted successfully",
    });
  }
};
