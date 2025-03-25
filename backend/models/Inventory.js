const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalValue: {
    type: Number,
    required: true
  },
  stockTurnover: {
    type: Number,
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    sku: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    reorderPoint: {
      type: Number,
      required: true
    },
    costPerUnit: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['High', 'Low', 'Critical'],
      required: true
    },
    inventoryAge: {
      type: Number, // Days in stock
      required: true
    }
  }],
  stockLevelsHistory: [{
    date: {
      type: Date,
      required: true
    },
    levels: [{
      productName: String,
      quantity: Number
    }]
  }],
  valueBreakdown: [{
    category: String,
    value: Number
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
inventorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory; 