const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller")
const authController = require("../controllers/auth.controller"); // ✅ authController 가져오기

router.post("/", authController.authenticate, reviewController.createReview);
router.get("/:certificateId", reviewController.getReviewsByCertificate);
router.get("/detail/:reviewId", reviewController.getReviewById);
router.put("/:reviewId", authController.authenticate, reviewController.updateReview);
router.delete("/:reviewId", authController.authenticate, reviewController.deleteReview);

module.exports = router;