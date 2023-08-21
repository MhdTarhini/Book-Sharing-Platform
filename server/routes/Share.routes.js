const express = require("express");
const router = express.Router();
const { share, getPost } = require("../controllers/share.controllers");

router.post("/share_book", share);
router.get("/get_posts", getPost);

module.exports = router;
