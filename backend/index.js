require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const publicPath = path.join(__dirname, '..', 'frontend', 'public');
const port = process.env.PORT || 5000;

const app = express();

// DB CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/mobileShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("CONNECTED TO DB!");
})
.catch((err) => {
  console.log("DB ERROR:", err);
});

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10MB', type: 'application/json' }));

app.use(express.static(publicPath));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/products', catalogRoutes); // ✅ added (optional fix)
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Start server
app.listen(port, () => {
  console.log(`SERVER NOW RUNNING ON PORT ${port}...`);
});