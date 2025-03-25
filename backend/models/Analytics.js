const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dataPoints: {
    type: Number,
    required: true
  },
  predictionAccuracy: {
    type: Number, // Percentage
    required: true
  },
  insightsGenerated: {
    type: Number,
    required: true
  },
  metrics: [{
    name: {
      type: String,
      required: true
    },
    currentValue: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    previousValue: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    change: {
      type: Number, // Percentage
      required: true
    },
    impact: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true
    }
  }],
  performanceTrends: [{
    date: {
      type: Date,
      required: true
    },
    metrics: {
      revenue: Number,
      unitsSold: Number,
      customerCount: Number,
      marketShare: Number
    }
  }],
  salesForecast: {
    nextThirtyDays: {
      revenue: Number,
      units: Number,
      confidence: Number
    },
    topProducts: [{
      name: String,
      predictedUnits: Number,
      predictedRevenue: Number
    }]
  },
  customerInsights: [{
    segment: String,
    revenue: Number,
    growth: Number,
    retention: Number
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
analyticsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics; 