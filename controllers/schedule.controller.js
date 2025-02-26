const mongoose = require("mongoose");
const Schedule = require("../models/Schedule");

const scheduleController = {};

// 1️⃣ 특정 날짜에 일정 추가
scheduleController.createSchedule = async (req, res) => {
  try {
    const { title, date, description, certificateId } = req.body;
    const userId = req.userId; // `authController.authenticate` 미들웨어에서 설정됨

    if (!title || !date) {
      throw new Error("Title and date are required");
    }

    const scheduleDate = new Date(date);
    scheduleDate.setHours(0, 0, 0, 0);

    // certificateId를 유효한 ObjectId로 변환
    let certificateObjectId = null;
    if (certificateId) {
      if (!mongoose.Types.ObjectId.isValid(certificateId)) {
        throw new Error("Invalid certificateId format");
      }
      certificateObjectId = new mongoose.Types.ObjectId(certificateId);
    }

    const newSchedule = new Schedule({
      userId,
      title,
      date: scheduleDate,
      description: description || "",
      certificateId: certificateObjectId
    });

    await newSchedule.save();

    res.status(201).json({ status: "success", schedule: newSchedule });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 2️⃣ 특정 사용자의 전체 일정 조회
scheduleController.getUserSchedules = async (req, res) => {
  try {
    const userId = req.userId;
    const schedules = await Schedule.find({ userId }).sort({ date: 1 }).populate("certificateId");

    res.status(200).json({ status: "success", schedules });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 3️⃣ 특정 날짜(YYYY-MM-DD)의 일정 조회
scheduleController.getSchedulesByDate = async (req, res) => {
  try {
    const userId = req.userId;
    const { date } = req.params;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const schedules = await Schedule.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 }).populate("certificateId");

    res.status(200).json({ status: "success", schedules });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 4️⃣ 특정 일정 조회 (일정 ID로 조회)
scheduleController.getScheduleById = async (req, res) => {
  try {
    const userId = req.userId;
    const { scheduleId } = req.params;
    const schedule = await Schedule.findOne({ _id: scheduleId, userId }).populate("certificateId");

    if (!schedule) throw new Error("Schedule not found");

    res.status(200).json({ status: "success", schedule });
  } catch (err) {
    res.status(404).json({ status: "fail", error: err.message });
  }
};

// 5️⃣ 특정 일정 수정
scheduleController.updateSchedule = async (req, res) => {
  try {
    const userId = req.userId;
    const { scheduleId } = req.params;
    const { certificateId } = req.body;

    let certificateObjectId = null;
    if (certificateId) {
      if (!mongoose.Types.ObjectId.isValid(certificateId)) {
        throw new Error("Invalid certificateId format");
      }
      certificateObjectId = new mongoose.Types.ObjectId(certificateId);
    }

    const updatedSchedule = await Schedule.findOneAndUpdate(
      { _id: scheduleId, userId },
      { ...req.body, certificateId: certificateObjectId },
      { new: true }
    );

    if (!updatedSchedule) throw new Error("Schedule not found");

    res.status(200).json({ status: "success", schedule: updatedSchedule });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 6️⃣ 특정 일정 삭제
scheduleController.deleteSchedule = async (req, res) => {
  try {
    const userId = req.userId;
    const { scheduleId } = req.params;

    const deletedSchedule = await Schedule.findOneAndDelete({ _id: scheduleId, userId });

    if (!deletedSchedule) throw new Error("Schedule not found");

    res.status(200).json({ status: "success", message: "Schedule deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = scheduleController;