const express = require("express");
const router = express.Router();
const { login, register, verify } = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/login", login);
router.post("/register", register);
router.get("/verify", authMiddleware, verify);

module.exports = router;
