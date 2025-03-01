const mongoose = require("mongoose");
const Review = require("../models/Review");

const reviewController = {};

reviewController.createReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { certificateId, content } = req.body;

    if (!certificateId || !content) {
      throw new Error("CertificateId and content are required");
    }

    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
      throw new Error("Invalid certificateId format");
    }

    const newReview = new Review({
      userId,
      certificateId,
      content
    });

    await newReview.save();

    res.status(201).json({ status: "success", review: newReview });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

reviewController.getReviewsByCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
      throw new Error("Invalid certificateId format");
    }

    const reviews = await Review.find({ certificateId, isDeleted: false }).populate("userId", "name");

    res.status(200).json({ status: "success", reviews });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

reviewController.getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new Error("Invalid reviewId format");
    }

    const review = await Review.findById(reviewId).populate("userId", "name");

    if (!review || review.isDeleted) throw new Error("Review not found");

    res.status(200).json({ status: "success", review });
  } catch (err) {
    res.status(404).json({ status: "fail", error: err.message });
  }
};

reviewController.updateReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { reviewId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new Error("Invalid reviewId format");
    }

    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId, userId },
      { content },
      { new: true }
    );

    if (!updatedReview) throw new Error("Review not found or no permission");

    res.status(200).json({ status: "success", review: updatedReview });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

reviewController.deleteReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { reviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new Error("Invalid reviewId format");
    }

    const deletedReview = await Review.findOneAndDelete({ _id: reviewId, userId });

    if (!deletedReview) throw new Error("Review not found or no permission");

    res.status(200).json({ status: "success", message: "Review deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = reviewController;