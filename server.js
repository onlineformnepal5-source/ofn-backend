require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Online Form Nepal Backend! 🇳🇵' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/onlineformnepal';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅');
    // Keep alive ping
setInterval(() => {
  fetch('https://ofn-backend.onrender.com/').catch(() => {});
}, 14 * 60 * 1000); // har 14 minute ma ping garcha
    app.listen(process.env.PORT || 5000, () => console.log('Server running ✅'));
  })
  .catch(err => console.log('DB Error:', err.message));