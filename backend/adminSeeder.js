const User = require("./model/usermodel");
const bcrypt = require("bcrypt");

exports.adminSeeder = async () => {
  const isAdminExist = await User.findOne({ userEmail: "admin@gmail.com" });

  // console.log("isAdminExist", isAdminExist);

  // const isAdminUser = await User.find({ userEmail: "admin@gmail.com" });
  // console.log("isAdminUser", isAdminUser);

  //admin seeding
  if (!isAdminExist) {
    await User.create({
      userName: "admin",
      userEmail: "admin@gmail.com",
      userPhoneNumber: "9892309034",
      role: "Admin",
      userPassword: bcrypt.hashSync("admin", 6),
    });
  } else {
    console.log("Admin seeded successfully");
  }
};
