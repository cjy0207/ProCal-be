const Certificate = require("../models/Certificate");

const certificateController = {};

// 자격증 추가
certificateController.createCertificate = async (req, res) => {
  try {
    const { name, examDate, eligibility, passingCriteria, difficulty, officialSite } = req.body;
    const newCertificate = new Certificate({
      name,
      examDate,
      eligibility,
      passingCriteria,
      difficulty,
      officialSite,
    });

    await newCertificate.save();
    return res.status(201).json({ status: "success", certificate: newCertificate });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 모든 자격증 조회
certificateController.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json({ status: "success", certificates });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 특정 자격증 조회
certificateController.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) throw new Error("Certificate not found");
    res.status(200).json({ status: "success", certificate });
  } catch (err) {
    res.status(404).json({ status: "fail", error: err.message });
  }
};

// 특정 자격증 수정
certificateController.updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCertificate = await Certificate.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCertificate) throw new Error("Certificate not found");
    res.status(200).json({ status: "success", certificate: updatedCertificate });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

// 특정 자격증 삭제
certificateController.deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCertificate = await Certificate.findByIdAndDelete(id);
    if (!deletedCertificate) throw new Error("Certificate not found");
    res.status(200).json({ status: "success", message: "Certificate deleted" });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = certificateController;