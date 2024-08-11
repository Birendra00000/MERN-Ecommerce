exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: "You don't have permission for this",
      });
    } else {
      next();
    }

    console.log(roles);
    console.log(userRole);
  };
};
