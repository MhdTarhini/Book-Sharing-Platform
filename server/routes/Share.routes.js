const express = require("express");
const router = express.Router();
const { share } = require("../controllers/share.controllers");

router.post("/share_book", share);

module.exports = router;
