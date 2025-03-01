const mongoose = require("mongoose");
const Comment = require("../models/Comment");

const commentController = {};

commentController.createComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId, content } = req.body;

    if (!postId || !content) {
      throw new Error("PostId and content are required");
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid postId format");
    }

    const newComment = new Comment({
      userId,
      postId,
      content
    });

    await newComment.save();

    res.status(201).json({ status: "success", comment: newComment });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

commentController.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid postId format");
    }

    const comments = await Comment.find({ postId, isDeleted: false }).populate("userId", "name");

    res.status(200).json({ status: "success", comments });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

commentController.getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new Error("Invalid commentId format");
    }

    const comment = await Comment.findById(commentId).populate("userId", "name");

    if (!comment || comment.isDeleted) throw new Error("Comment not found");

    res.status(200).json({ status: "success", comment });
  } catch (err) {
    res.status(404).json({ status: "fail", error: err.message });
  }
};

commentController.updateComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { commentId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new Error("Invalid commentId format");
    }

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId, userId },
      { content },
      { new: true }
    );

    if (!updatedComment) throw new Error("Comment not found or no permission");

    res.status(200).json({ status: "success", comment: updatedComment });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

commentController.deleteComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      throw new Error("Invalid commentId format");
    }

    const deletedComment = await Comment.findOneAndDelete({ _id: commentId, userId });

    if (!deletedComment) throw new Error("Comment not found or no permission");

    res.status(200).json({ status: "success", message: "Comment deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = commentController;