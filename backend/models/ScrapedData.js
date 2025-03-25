const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['competitor', 'feedback', 'trend', 'pricing', 'leads']
  },
  source: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  metadata: {
    scrapedAt: {
      type: Date,
      default: Date.now
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active'
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Index for faster queries
scrapedDataSchema.index({ category: 1, userId: 1 });
scrapedDataSchema.index({ 'metadata.scrapedAt': -1 });

const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);

module.exports = ScrapedData; 