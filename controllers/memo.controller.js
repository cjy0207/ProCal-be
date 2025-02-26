const Memo = require("../models/Memo");

const memoController = {};

// 1️⃣ 특정 날짜에 메모 추가
memoController.createMemo = async (req, res) => {
  try {
    const { title, content, createdAt } = req.body;
    const userId = req.userId; // ⬅️ JWT 인증 미들웨어에서 설정됨

    if (!title || !content || !createdAt) {
      throw new Error("Title, content, and createdAt (date) are required");
    }

    const memoDate = new Date(createdAt);
    memoDate.setHours(0, 0, 0, 0);

    const newMemo = new Memo({ userId, title, content, createdAt: memoDate });
    await newMemo.save();

    res.status(201).json({ status: "success", memo: newMemo });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 2️⃣ 특정 사용자의 전체 메모 조회
memoController.getUserMemos = async (req, res) => {
  try {
    const userId = req.userId;
    const memos = await Memo.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", memos });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 3️⃣ 특정 날짜(YYYY-MM-DD)의 메모 조회
memoController.getMemosByDate = async (req, res) => {
  try {
    const userId = req.userId;
    const { date } = req.params;

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const memos = await Memo.find({
      userId,
      createdAt: { $gte: startDate, $lte: endDate }
    }).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", memos });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 4️⃣ 특정 메모 조회 (메모 ID로 조회)
memoController.getMemoById = async (req, res) => {
  try {
    const userId = req.userId;
    const { memoId } = req.params;
    const memo = await Memo.findOne({ _id: memoId, userId });

    if (!memo) throw new Error("Memo not found");

    res.status(200).json({ status: "success", memo });
  } catch (err) {
    res.status(404).json({ status: "fail", error: err.message });
  }
};

// 5️⃣ 특정 메모 수정
memoController.updateMemo = async (req, res) => {
  try {
    const userId = req.userId;
    const { memoId } = req.params;

    const updatedMemo = await Memo.findOneAndUpdate(
      { _id: memoId, userId },
      req.body,
      { new: true }
    );

    if (!updatedMemo) throw new Error("Memo not found");

    res.status(200).json({ status: "success", memo: updatedMemo });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 6️⃣ 특정 메모 삭제
memoController.deleteMemo = async (req, res) => {
  try {
    const userId = req.userId;
    const { memoId } = req.params;

    const deletedMemo = await Memo.findOneAndDelete({ _id: memoId, userId });

    if (!deletedMemo) throw new Error("Memo not found");

    res.status(200).json({ status: "success", message: "Memo deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = memoController;