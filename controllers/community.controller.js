const mongoose = require("mongoose");
const Community = require("../models/Community");

const communityController = {};

communityController.createPost = async (req, res) => {
  try {
    const userId = req.userId; 
    const { title, content } = req.body;

    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    const newPost = new Community({
      userId,
      title,
      content
    });

    await newPost.save();

    res.status(201).json({ status: "success", post: newPost });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

communityController.getAllPosts = async (req, res) => {
  try {
    const posts = await Community.find({ isDeleted: false }).populate("userId", "name");

    res.status(200).json({ status: "success", posts });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

communityController.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid postId format");
    }

    const post = await Community.findById(postId).populate("userId", "name");

    if (!post || post.isDeleted) throw new Error("Post not found");

    res.status(200).json({ status: "success", post });
  } catch (err) {
    res.status(404).json({ status: "fail", error: err.message });
  }
};

communityController.updatePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid postId format");
    }

    const updatedPost = await Community.findOneAndUpdate(
      { _id: postId, userId },
      { title, content },
      { new: true }
    );

    if (!updatedPost) throw new Error("Post not found or no permission");

    res.status(200).json({ status: "success", post: updatedPost });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

communityController.deletePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid postId format");
    }

    const deletedPost = await Community.findOneAndDelete({ _id: postId, userId });

    if (!deletedPost) throw new Error("Post not found or no permission");

    res.status(200).json({ status: "success", message: "Post deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = communityController;