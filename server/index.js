const express = require("express");
const app = express();
const mongooseConnect = require("./configs/mongoDB.connect");

app.listen(8000, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("server running on port: ", 8000);
  mongooseConnect();
});
