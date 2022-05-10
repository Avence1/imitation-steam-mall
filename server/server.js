const { initConnect } = require("./database.js");
const express = require("express");
const multer = require("multer")();
const app = express();
const bodyParser = require("body-parser");
const signupRouter = require("./routers/signupRouter.js");
const authRouter = require("./routers/authRouter.js");
const signinRouter = require("./routers/signinRouter.js");
const getGameRouter = require("./routers/getGameRouter.js");
const removeItemRouter = require("./routers/removeItemRouter.js");
initConnect();
app.use("/", (req, res, next) => {
  res.set({ "Content-Type": "text/html;charset=utf-8" });
  res.set({ "Access-Control-Allow-Origin": "*" });
  res.set({ "Access-Control-Allow-Methods": "*" });
  res.set({ "Access-Control-Allow-Headers": "*" });
  res.set({ "Access-Control-Max-Age": 86400 });
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer.none());
app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/auth", authRouter);
app.use("/getGame", getGameRouter);
app.use("/removeItem", removeItemRouter);

app.listen(4010, "127.0.0.1", () =>
  console.log("服务已开启，正在监听4010端口")
);
