const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, default: "" }, 
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate", default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Schedule", ScheduleSchema);