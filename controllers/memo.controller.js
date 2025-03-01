const Memo = require("../models/Memo");

const memoController = {};

memoController.createMemo = async (req, res) => {
  try {
    const { title, content, createdAt } = req.body;
    const userId = req.userId;

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

memoController.getUserMemos = async (req, res) => {
  try {
    const userId = req.userId;
    const memos = await Memo.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", memos });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

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