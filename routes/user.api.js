const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

router.post("/", userController.createUser);
router.get("/me", authController.authenticate, userController.getUser) //토큰이 valid한 토큰인지, 이 token을 가지고 유저를 찾아서 리턴 -> middleware

module.exports = router;