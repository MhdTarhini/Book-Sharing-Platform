const express = require("express");
const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "../../storage/uploads/images"))
);

const authMiddleware = require("./middlewares/auth.middleware");

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const shareRouter = require("./routes/Share.routes");
app.use("/share", authMiddleware, shareRouter);

const uploadImage = require("./routes/uploadImage.routes");
app.use("/uploadImage", uploadImage);

const followRouter = require("./routes/follow.routes");
app.use("/user", followRouter);

const Follow = require("./models/follow.model");

app.listen(8000, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("server running on port: ", 8000);
  mongooseConnect();
});
