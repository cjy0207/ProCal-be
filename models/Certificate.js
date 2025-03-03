const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  examDate: { type: Date, required: true },
  eligibility: { type: String, required: true }, 
  passingCriteria: { type: String, required: true }, 
  officialSite: { type: String, required: false }, 
  averageDifficulty: { type: Number, default: 0 }, 
  totalDifficulty: { type: Number, default: 0 }, 
  reviewCount: { type: Number, default: 0 } 
});

module.exports = mongoose.model("Certificate", CertificateSchema);