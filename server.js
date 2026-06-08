require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Online Form Nepal Backend! 🇳🇵' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
mongoose.connect('mongodb://127.0.0.1:27017/onlineformnepal')
  .then(() => {
    console.log('MongoDB connected ✅');
    app.listen(5000, () => console.log('Server running on port 5000 ✅'));
  })
  .catch(err => console.log(err));