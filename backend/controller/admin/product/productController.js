//FOR CREATING PRODUCT DATABASE

const Product = require("../../../model/productModal");
const fs = require("fs").promises; // Import fs with promises support

exports.createProduct = async (req, res) => {
  console.log(req.file);

  const file = req.file;

  let filePath;
  if (!file) {
    filePath = "";
  } else {
    filePath = req.file.filename;
  }

  const {
    productName,
    productDescription,
    productStockQty,
    productPrice,
    productStatus,
  } = req.body;
  console.log(req.body);

  if (
    !productName ||
    !productDescription ||
    !productStockQty ||
    !productPrice ||
    productStatus
  ) {
    res.status(400).json({
      message: "Please provide all detail information about Product",
    });
  }

  await Product.create({
    productName,
    productDescription,
    productPrice,
    productStatus,
    productQuantity: productStockQty,
    productImage: process.env.URL + filePath,
  });
  res.status(200).json({
    message: "Product created successfully",
  });
};

//FOR GETTING ALL PRODUCTS

exports.allProducts = async (req, res) => {
  const product = await Product.find();

  if (product.length < 0) {
    res.status(400).json({
      message: "Invalid product ID",
    });
  } else {
    res.status(200).json({
      message: "Successfully fetched Single product",
      data: product,
    });
  }
};

//FOR GETTING SINGLE PRODUCT ID

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Pleased provide ID",
    });
  }
  const product = await Product.find({ _id: id });

  if (product.length == 0) {
    res.status(400).json({
      message: "Invalid product ID",
    });
  } else {
    res.status(200).json({
      message: "Successfully fetched Single product",
      data: product,
    });
  }
};

//FOR DELETING PRODUCTS

exports.productDelete = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Pleased provide ID",
    });
  }

  const oldData = await Product.findById(id);

  if (!oldData) {
    return res.status(400).json({
      message: "Invalid  Product Id",
    });
  }
  const oldProductImage = oldData.productImage; //http://localhost:3000+icon.consloe.png

  const lengthCut = process.env.URL.length;

  const finalImagePathAfterCut = oldProductImage.slice(lengthCut); //icon.consloe.png
  console.log(finalImagePathAfterCut);

  if (req.file && req.file.filename) {
    fs.unlink("./uploads/" + finalImagePathAfterCut, (error) => {
      if (error) {
        console.log("Error deleting file", error);
      } else {
        console.log("File deleted successfully");
      }
    });
  }
  const product = await Product.findOneAndDelete({ _id: id });
  res.status(200).json({
    message: "Product deleted successfully",
    datas: product,
  });
};

//for EDITING ITEMS

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const {
    productName,
    productDescription,
    productStockQty,
    productPrice,
    productStatus,
  } = req.body;

  // if (
  //   !productName ||
  //   !productDescription ||
  //   !productStockQty ||
  //   !productPrice ||
  //   !productStatus ||
  //   !id
  // ) {
  //   return res.status(400).json({
  //     message: "Please provide all detail information about Product",
  //   });
  // }

  const oldData = await Product.findById(id);

  if (!oldData) {
    res.status(400).json({
      message: "Invalid  Product Id",
    });
  }
  const oldProductImage = oldData.productImage; //http://localhost:3000+icon.consloe.png

  const lengthCut = process.env.URL.length;

  const finalImagePathAfterCut = oldProductImage.slice(lengthCut);
  console.log(finalImagePathAfterCut);

  if (req.file && req.file.filename) {
    fs.unlink("./uploads/" + finalImagePathAfterCut, (error) => {
      if (error) {
        console.log("Error deleting file", error);
      } else {
        console.log("File deleted successfully");
      }
    });
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productPrice,
      productStockQty,
      productStatus,
      productImage:
        req.file && req.file.filename
          ? process.env.URL + req.file.filename
          : oldProductImage,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Product Updated successfully",
    data: product,
  });
};
