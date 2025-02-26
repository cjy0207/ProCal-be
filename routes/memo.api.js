const express = require("express");
const router = express.Router();
const memoController = require("../controllers/memo.controller");
const authController = require("../controllers/auth.controller"); 

router.post("/", authController.authenticate, memoController.createMemo);
router.get("/", authController.authenticate, memoController.getUserMemos);
router.get("/:date", authController.authenticate, memoController.getMemosByDate);
router.get("/detail/:memoId", authController.authenticate, memoController.getMemoById);
router.put("/:memoId", authController.authenticate, memoController.updateMemo);
router.delete("/:memoId", authController.authenticate, memoController.deleteMemo);

module.exports = router;