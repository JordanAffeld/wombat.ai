const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  monthlySales: [{
    month: String,
    units: Number,
    revenue: Number
  }],
  competitors: [{
    name: String,
    marketShare: Number,
    price: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales; 