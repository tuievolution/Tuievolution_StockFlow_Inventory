const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Sayim = require('./models/Sayim');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB bağlandı'))
  .catch(err => console.log('MongoDB Bağlantı Hatası:', err));

// Tüm verileri getir
app.get('/api/sayim', async (req, res) => {
  const veriler = await Sayim.find().sort({ tarihSaat: -1 });
  res.json(veriler);
});

// Yeni veri ekle
app.post('/api/sayim', async (req, res) => {
  const yeniSayim = new Sayim(req.body);
  await yeniSayim.save();
  res.json(yeniSayim);
});

// Veri güncelle
app.put('/api/sayim/:id', async (req, res) => {
  const guncel = await Sayim.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(guncel);
});

// Veri sil
app.delete('/api/sayim/:id', async (req, res) => {
  await Sayim.findByIdAndDelete(req.params.id);
  res.json({ mesaj: 'Silindi' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));