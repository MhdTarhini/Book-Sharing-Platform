const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.post("/", async function (req, res) {
  try {
    const base64Data = req.body.image;
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new Error("Invalid image data format");
    }

    const imageType = matches[1].split("/")[1];
    const imageBuffer = Buffer.from(matches[2], "base64");
    const imageFileName = Date.now() + "." + imageType;
    const imagePath = path.join(
      __dirname,
      "../storage/uploads/images",
      imageFileName
    );

    fs.writeFileSync(imagePath, imageBuffer);
    res.status(200).json({ filename: imageFileName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving image" });
  }
});

module.exports = router;
