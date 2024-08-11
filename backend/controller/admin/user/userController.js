const User = require("../../../model/usermodel");

exports.getUsers = async (req, res) => {
  const user_Id = req.user.id;

  const users = await User.find({ _id: { $ne: user_Id } }).select("-__v"); //If we want to remove not required data from user we can do .select("-__v")
  //If we want to add .select("+__v")

  if (users.length > 1) {
    res.status(200).json({
      message: "Successsfully fetched User data",
      data: users,
    });
  } else {
    res.status.json({
      message: "User Collection is empty",
      data: [],
    });
  }
};

exports.deleteUsers = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).json({
      message: "Pleased provide ID",
    });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({
      message: "User not found with that Id",
    });
  }

  await User.findByIdAndDelete(id);
  res.status(200).json({
    message: "User deleted successfully",
  });
};
