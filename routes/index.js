const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const authApi = require("./auth.api");
const certificateApi = require("./certificate.api")
const memoApi = require("./memo.api");
const scheduleApi = require('./schedule.api')
const reminderApi = require("./reminder.api")
const communityApi = require("./community.api")
const commentApi = require("./comment.api")
const reviewApi = require("./review.api")

router.use("/user", userApi);
router.use("/auth", authApi);
router.use("/certificate", certificateApi);
router.use("/memo", memoApi);
router.use("/schedule", scheduleApi);
router.use("/reminder", reminderApi);
router.use("/community", communityApi);
router.use("/comment", commentApi);
router.use("/review", reviewApi);

module.exports = router;