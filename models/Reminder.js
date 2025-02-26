const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 사용자 ID (토큰으로 처리)
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate", required: true }, // 자격증 ID
  addedAt: { type: Date, default: Date.now } // 리마인더 추가 날짜
});

module.exports = mongoose.model("Reminder", ReminderSchema);