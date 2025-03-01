const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  title: { type: String, required: true }, 
  content: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }, 
  isDeleted: { type: Boolean, default: false } 
});

module.exports = mongoose.model("Community", CommunitySchema);