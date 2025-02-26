const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminder.controller");
const authController = require("../controllers/auth.controller"); // JWT 인증 미들웨어

// ⬇️ 인증 미들웨어 적용
router.post("/", authController.authenticate, reminderController.createReminder);
router.get("/", authController.authenticate, reminderController.getUserReminders);
router.delete("/:reminderId", authController.authenticate, reminderController.deleteReminder);

module.exports = router;