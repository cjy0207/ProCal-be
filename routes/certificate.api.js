const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificate.controller");

router.post("/", certificateController.createCertificate); 
router.get("/", certificateController.getAllCertificates); 
router.get("/:id", certificateController.getCertificateById); // 특정 자격증 조회
router.put("/:id", certificateController.updateCertificate); // 특정 자격증 수정
router.delete("/:id", certificateController.deleteCertificate); // 특정 자격증 삭제

module.exports = router;