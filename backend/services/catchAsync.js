module.exports = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((error) => {
      return res.status(500).json({
        // message: error.message,
        message: error.message,
        error: "Something went wrong",
      });
    });
  };
};
