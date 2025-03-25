const mongoose = require('mongoose');
const User = require('../models/User');
const Sales = require('../models/Sales');
require('dotenv').config();

const addSampleData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find dev user
    const devUser = await User.findOne({ email: 'dev@wombat.ai' });
    if (!devUser) {
      console.log('Dev user not found. Please run verifyDevUser.js first.');
      process.exit(1);
    }

    // Sample tea products
    const teaProducts = [
      {
        productName: 'Earl Grey Tea',
        monthlySales: [
          { month: 'Jan 2024', units: 150, revenue: 2250 },
          { month: 'Feb 2024', units: 180, revenue: 2700 },
          { month: 'Mar 2024', units: 200, revenue: 3000 }
        ],
        competitors: [
          { name: 'Twinings', marketShare: 35, price: 15 },
          { name: 'Harney & Sons', marketShare: 25, price: 18 },
          { name: 'Bigelow', marketShare: 40, price: 12 }
        ]
      },
      {
        productName: 'Green Tea',
        monthlySales: [
          { month: 'Jan 2024', units: 200, revenue: 3000 },
          { month: 'Feb 2024', units: 220, revenue: 3300 },
          { month: 'Mar 2024', units: 250, revenue: 3750 }
        ],
        competitors: [
          { name: 'Lipton', marketShare: 30, price: 10 },
          { name: 'Yogi', marketShare: 20, price: 14 },
          { name: 'Celestial Seasonings', marketShare: 50, price: 12 }
        ]
      },
      {
        productName: 'Chai Tea',
        monthlySales: [
          { month: 'Jan 2024', units: 120, revenue: 1800 },
          { month: 'Feb 2024', units: 150, revenue: 2250 },
          { month: 'Mar 2024', units: 180, revenue: 2700 }
        ],
        competitors: [
          { name: 'Tazo', marketShare: 40, price: 16 },
          { name: 'Stash', marketShare: 25, price: 14 },
          { name: 'Traditional Medicinals', marketShare: 35, price: 15 }
        ]
      }
    ];

    // Add sales data for each product
    for (const product of teaProducts) {
      const sale = new Sales({
        userId: devUser._id,
        ...product
      });
      await sale.save();
      console.log(`Added sales data for ${product.productName}`);
    }

    console.log('Sample data added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addSampleData(); 