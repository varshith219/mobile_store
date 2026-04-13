const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});

    // If no products in DB → send message
    if (products.length === 0) {
      return res.status(200).json({
        message: "No products found",
        data: []
      });
    }

    res.status(200).json(products);

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Server error while fetching products"
    });
  }
});

module.exports = router;