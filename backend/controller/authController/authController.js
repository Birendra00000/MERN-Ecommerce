const User = require("../../model/usermodel");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const sendEmail = require("../../services/sendEmail");
const Product = require("../../model/productModal");

//User register api
exports.userRegister = async (req, res) => {
  console.log(req.body);
  const { email, phoneNumber, password, name } = req.body;

  if (!email || !phoneNumber || !password || !name) {
    return res.status(400).json({
      message: "Please provide name,email,password and phonenumber",
    });
  }

  //Check if that email already exists or not

  const emailChecked = await User.find({ userEmail: email });

  if (emailChecked.length > 0) {
    return res.status(400).json({
      message: "User with that email already existed.",
    });
  }

  User.create({
    userName: name,
    userEmail: email,
    userPhoneNumber: phoneNumber,
    userPassword: bcrypt.hashSync(password, 6),
  });

  res.status(201).json({
    message: "Data is submitted successfully",
  });
};

//UserLogin api

exports.userLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Pleased fill the email or password",
    });
  }

  const loginEmailChecked = await User.find({ userEmail: email });

  if (loginEmailChecked.length == 0) {
    return res.status(400).json({
      message: "User with that email is not registered",
    });
  }

  const passwordCheckedMatch = bcrypt.compareSync(
    password,
    loginEmailChecked[0].userPassword
  ); // true

  if (passwordCheckedMatch) {
    const token = jwt.sign(
      { id: loginEmailChecked[0]._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "20d",
      }
    );

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } else {
    res.status(404).json({
      message: "Invalid password or email",
    });
  }
};

//Forgot password and send OTP

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please provide the email",
      });
    }

    const emailExist = await User.findOne({ userEmail: email });

    if (emailExist.length === 0) {
      return res.status(404).json({
        message: "Email is not registered",
      });
    }

    const OTP = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: true,
      specialChars: false,
    });

    emailExist.OTP = OTP;
    await emailExist.save();
    console.log("User saved successfully:", emailExist.OTP);

    await sendEmail({
      email: "birendrabhusal555@gmail.com",
      subject: "Bibek bhusal",
      message: `Your OTP is: ${OTP}`,
    });

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//Check OTP is correct or not

exports.otpChecked = async (req, res) => {
  const { email, OTP } = req.body;

  if (!email) {
    res.status(400).json({
      message: "Pleased provide Email",
    });
  }

  //Check if that Otp is correct or not

  const userExist = await User.find({ userEmail: email });

  if (userExist.length == 0) {
    res.status(404).json({
      message: "User is not registered",
    });
  }
  if (userExist[0].OTP !== OTP) {
    res.status(400).json({
      message: "Invalid OTP",
    });
  } else {
    userExist[0].OTP = undefined;
    userExist[0].isOtpVerified = true;
    await userExist[0].save();

    res.status(200).json({
      message: "Successfully OTP",
    });
  }
};

//For changing password

exports.changePassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    res.status(400).json({
      message: "Pleased provide all value",
    });
  }

  if (newPassword !== confirmPassword) {
    res.status(400).json({
      message: "New Password and Confirm Password doesn't match",
    });
  }

  const userExist = await User.find({ userEmail: email });

  if (userExist[0].length == 0)
    res.status(404).json({
      message: " User is not registered",
    });

  if (userExist[0].isOtpVerified !== true) {
    return res.status(403).json({
      message: "You cannot perform this action",
    });
  }

  userExist[0].newPassword = bcrypt.hashSync(newPassword, 6);

  userExist[0].isOtpVerified = false;
  await userExist[0].save();

  res.status(200).json({
    message: "Password Changed successfully",
  });

  // console.log("New password saved successfully:", userExist[0].newPassword);
};
