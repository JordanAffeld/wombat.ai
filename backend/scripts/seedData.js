const mongoose = require('mongoose');
const User = require('../models/User');
const Sales = require('../models/Sales');
const Inventory = require('../models/Inventory');
const Pricing = require('../models/Pricing');
const Analytics = require('../models/Analytics');
const { getDevData } = require('../controllers/devData');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find or create dev user
    let devUser = await User.findOne({ email: 'dev@wombat.ai' });
    if (!devUser) {
      devUser = await User.create({
        email: 'dev@wombat.ai',
        password: 'devpassword123',
        name: 'Dev Account',
        role: 'admin'
      });
    }

    // Get dev data
    const inventoryData = await getDevData('dev', 'inventory');
    const pricingData = await getDevData('dev', 'pricing');
    const analyticsData = await getDevData('dev', 'analytics');

    // Remove existing data for this user
    await Promise.all([
      Sales.deleteMany({ userId: devUser._id }),
      Inventory.deleteMany({ userId: devUser._id }),
      Pricing.deleteMany({ userId: devUser._id }),
      Analytics.deleteMany({ userId: devUser._id })
    ]);

    // Create new data
    await Promise.all([
      Inventory.create({
        userId: devUser._id,
        ...inventoryData.metrics,
        items: inventoryData.items,
        stockLevelsHistory: [{ date: new Date(), levels: inventoryData.stockLevels.datasets }],
        valueBreakdown: inventoryData.valueBreakdown
      }),
      Pricing.create({
        userId: devUser._id,
        ...pricingData.metrics,
        products: pricingData.products,
        priceHistory: pricingData.trends.datasets,
        competitorPrices: pricingData.competitors
      }),
      Analytics.create({
        userId: devUser._id,
        ...analyticsData.metrics,
        metrics: analyticsData.keyMetrics,
        performanceTrends: analyticsData.performanceTrends.datasets,
        salesForecast: analyticsData.forecast,
        customerInsights: analyticsData.customerSegments
      })
    ]);

    console.log('Dummy data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 