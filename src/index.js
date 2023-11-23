require("dotenv").config(); // đọc tất cả trong file .env

const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./database/connect");
// const Todo = require("./models/Todo");
const todoRouter = require("./api/todo");
const authRouter = require("./api/auth");
// const loginMiddleware = require("./middlewares/demoMiddleware");
// const loginSchema = require("./validations/loginSchema");
// const validator = require("./middlewares/validator");
const { env } = require("./config/env");
const port = env.PORT;

// Sài morgan
app.use(express.json()); // Nó thêm 1 middleware vào ứng dụng Express
app.use(morgan("dev")); // giúp cho việc log nhanh chóng

// connect database
connectDB().then(() => {
  console.log("Connected Database Successfully");
});

app.use("/todo", todoRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
