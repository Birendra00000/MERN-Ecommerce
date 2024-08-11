const express = require("express");
const { connectDatabase } = require("./database/database");
const User = require("./model/usermodel");
const {
  userRegister,
  userLogin,
} = require("./controller/authController/authController");

const app = express();
const { Server } = require("socket.io");

require("dotenv").config();

//We are getting a port number from .env
const PORT = process.env.PORT;
//For connecting data we are invoking a function
connectDatabase(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is Home page");
});

//Router Api

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoute");
const adminUserRoutes = require("./routes/adminUserRoutes");
const reviewRoutes = require("./routes/userReview");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", adminUserRoutes);
app.use("/api", reviewRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

// //Register User Api

// app.post("/register", userRegister);

// //User login api

// app.post("/login", userLogin);

//Telling node js to give access to image folder that is upload

app.use(express.static("uploads"));

const socketserver = app.listen(PORT, () => {
  console.log(`THE PORT IS RUNNING AT ${PORT}`);
});

const io = new Server(socketserver);

io.on("connection", (socket) => {
  console.log("Web socket is CONNECTED");

  socket.on("disconnect", () => {
    console.log("Web socket is DISCONNECTED");
  });
});
