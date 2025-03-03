const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate", required: true }, 
  content: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }, 
  adminComment: { type: String, default: "" }, 
  difficulty: { 
    type: Number, 
    required: true,
    min: 1, 
    max: 5, 
  }, 
  isDeleted: { type: Boolean, default: false } 
});

module.exports = mongoose.model("Review", ReviewSchema);