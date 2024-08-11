const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowFieldType = ["image/png", "image/jpg", "image/jpeg"];

    if (!allowFieldType.includes(file.mimetype)) {
      return cb(new Error("This fieldType is not supported"));
    }

    cb(null, "./uploads"); //cb(error,success)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = { multer, storage };
