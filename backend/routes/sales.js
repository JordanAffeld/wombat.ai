const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');
const { auth } = require('../middleware/auth');

// Get sales data for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const salesData = await Sales.findOne({ userId: req.user._id });
    if (!salesData) {
      return res.status(404).json({ message: 'No sales data found' });
    }
    res.json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 