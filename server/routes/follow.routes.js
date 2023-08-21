const express = require("express");
const router = express.Router();
const { followUser } = require("../controllers/follow.controllers");

router.post("/follow", followUser);

module.exports = router;
