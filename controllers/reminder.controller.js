const mongoose = require("mongoose");
const Reminder = require("../models/Reminder");

const reminderController = {};

// 1️⃣ 리마인더 추가 (JWT에서 userId 가져옴)
reminderController.createReminder = async (req, res) => {
  try {
    const userId = req.userId; // JWT에서 가져옴
    const { certificateId } = req.body;

    if (!certificateId) {
      throw new Error("CertificateId is required");
    }

    // certificateId가 유효한 ObjectId인지 확인
    if (!mongoose.Types.ObjectId.isValid(certificateId)) {
      throw new Error("Invalid certificateId format");
    }

    const newReminder = new Reminder({
      userId,
      certificateId
    });

    await newReminder.save();

    res.status(201).json({ status: "success", reminder: newReminder });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 2️⃣ 사용자의 모든 리마인더 조회
reminderController.getUserReminders = async (req, res) => {
  try {
    const userId = req.userId; // JWT에서 가져옴
    const reminders = await Reminder.find({ userId }).populate("certificateId");

    res.status(200).json({ status: "success", reminders });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 3️⃣ 특정 리마인더 삭제
reminderController.deleteReminder = async (req, res) => {
  try {
    const userId = req.userId; // JWT에서 가져옴
    const { reminderId } = req.params;

    const deletedReminder = await Reminder.findOneAndDelete({ _id: reminderId, userId });

    if (!deletedReminder) throw new Error("Reminder not found");

    res.status(200).json({ status: "success", message: "Reminder deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = reminderController;