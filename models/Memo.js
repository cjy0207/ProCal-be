const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  title: { type: String, required: true },
  content: { type: String, required: true }, 
  createdAt: { type: Date, required: true } 
});

module.exports = mongoose.model("Memo", MemoSchema);