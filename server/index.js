const express = require("express");
const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
const cors = require("cors");

require("dotenv").config();
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

const authMiddleware = require("./middlewares/auth.middleware");

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);


app.listen(8000, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("server running on port: ", 8000);
  mongooseConnect();
});
