const {
  createProduct,
  productDelete,
  getProduct,
  editProduct,
  allProducts,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const { restrictTo } = require("../middleware/restricTo");

const router = require("express").Router();

const { multer, storage } = require("../middleware/multerConfig");
const catchAsync = require("../services/catchAsync");

const upload = multer({ storage: storage });

// router
//   .route("/products")
//   .post(
//     isAuthenticated,
//     restrictTo("Admin"),
//     upload.single("productImage"),
//     createProduct
//   );

router
  .route("/products")
  .post(
    isAuthenticated,
    restrictTo("Admin"),
    upload.single("productImage"),
    catchAsync(createProduct)
  )
  .get(catchAsync(allProducts));

router
  .route("/products/:id")
  .get(catchAsync(getProduct))
  .delete(isAuthenticated, restrictTo("Admin"), catchAsync(productDelete))
  .patch(
    isAuthenticated,
    restrictTo("Admin"),
    upload.single("productImage"),
    catchAsync(editProduct)
  );

module.exports = router;
