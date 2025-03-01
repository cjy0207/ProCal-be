const mongoose = require("mongoose");
const Reminder = require("../models/Reminder");

const reminderController = {};

reminderController.createReminder = async (req, res) => {
  try {
    const userId = req.userId; 
    const { certificateId } = req.body;

    if (!certificateId) {
      throw new Error("CertificateId is required");
    }

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

reminderController.getUserReminders = async (req, res) => {
  try {
    const userId = req.userId; 
    const reminders = await Reminder.find({ userId }).populate("certificateId");

    res.status(200).json({ status: "success", reminders });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

reminderController.deleteReminder = async (req, res) => {
  try {
    const userId = req.userId;
    const { reminderId } = req.params;

    const deletedReminder = await Reminder.findOneAndDelete({ _id: reminderId, userId });

    if (!deletedReminder) throw new Error("Reminder not found");

    res.status(200).json({ status: "success", message: "Reminder deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = reminderController;