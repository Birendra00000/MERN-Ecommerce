var jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const promisify = require("util").promisify;
//const {promisify}=require("util")

const isAuthenticated = async (req, res, next) => {
  console.log("The user is authenticated");
  //   next();

  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "Pleased provide token",
    });
  }

  // jwt.verify(token, process.env.SECRET_KEY, (error, success) => {
  //   if (error) {
  //     res.status(400).json({
  //       message: "Invaid Token",
  //     });
  //   } else {
  //     res.status(200).json({
  //       message: "Valid token successfully",
  //     });
  //   }
  // });

  //Alterntive methods

  try {
    const decodeToken = await promisify(jwt.verify)(
      token,
      process.env.SECRET_KEY
    );
    console.log("The decode token is", decodeToken.id);

    const userDoesExit = await User.findOne({ _id: decodeToken.id });

    if (!userDoesExit) {
      res.status(404).json({
        message: "User doesn't exist with this token",
      });
    }
    req.user = userDoesExit;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Don't try to do this",
    });
  }
};

module.exports = isAuthenticated;
