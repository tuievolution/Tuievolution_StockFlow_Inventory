const mongoose = require('mongoose');

const SayimSchema = new mongoose.Schema({
  barkod: { type: String, required: true },
  miktar: { type: Number, required: true },
  urunAdi: { type: String },
  kaynakIsyeri: { type: String },
  fabrika: { type: String },
  kaynakAmbar: { type: String },
  tarihSaat: { type: Date, default: Date.now },
  evrakNo: { type: String },
  ozelKod1: { type: String },
  aciklama: { type: String },
});

module.exports = mongoose.model('Sayim', SayimSchema);