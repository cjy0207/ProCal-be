const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true }, 
  content: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }, 
  isDeleted: { type: Boolean, default: false } 
});

module.exports = mongoose.model("Comment", CommentSchema);