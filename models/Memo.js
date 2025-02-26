const mongoose = require("mongoose");

const MemoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 사용자 ID
  title: { type: String, required: true }, // 메모 제목
  content: { type: String, required: true }, // 메모 내용
  createdAt: { type: Date, required: true } // 선택한 날짜를 Date 타입으로 저장
});

module.exports = mongoose.model("Memo", MemoSchema);