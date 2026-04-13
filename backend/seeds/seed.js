const mongoose = require('mongoose');
const seedProducts = require('./products'); // ✅ ONLY THIS

mongoose.connect("mongodb://127.0.0.1:27017/mobileShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log("✅ DB Connected");
  seedProducts();
});