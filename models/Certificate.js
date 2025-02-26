const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  examDates: { type: [Date], required: true }, 
  eligibility: { type: [String], required: true }, 
  passingCriteria: { type: [String], required: true }, 

  difficulty: { 
    type: Number, 
    required: true,
    min: 1, 
    max: 5, 
  }, 

  officialSite: { type: String, required: false } // 공식 사이트 (선택 사항)
});

module.exports = mongoose.model("Certificate", CertificateSchema);