const mongoose = require("mongoose");
const { adminSeeder } = require("../adminSeeder");

exports.connectDatabase = async (URL) => {
  await mongoose.connect(URL);
  console.log("Database is connected");
  adminSeeder();
};
