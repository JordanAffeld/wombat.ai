const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  averagePrice: {
    type: Number,
    required: true
  },
  competitiveness: {
    type: Number, // Score out of 100
    required: true
  },
  profitMargin: {
    type: Number, // Percentage
    required: true
  },
  products: [{
    name: {
      type: String,
      required: true
    },
    currentPrice: {
      type: Number,
      required: true
    },
    marketAverage: {
      type: Number,
      required: true
    },
    trend: {
      type: String,
      enum: ['Up', 'Down', 'Stable'],
      required: true
    },
    margin: {
      type: Number,
      required: true
    },
    elasticity: {
      type: Number,
      required: true
    }
  }],
  priceHistory: [{
    date: {
      type: Date,
      required: true
    },
    averagePrice: Number,
    marketAverage: Number
  }],
  competitorPrices: [{
    competitor: String,
    price: Number,
    marketShare: Number,
    lastUpdated: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
pricingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Pricing = mongoose.model('Pricing', pricingSchema);

module.exports = Pricing; 