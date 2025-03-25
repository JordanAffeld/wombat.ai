const mongoose = require('mongoose');
const Sales = require('../models/Sales');
require('dotenv').config();

async function addTestData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing test data
        await Sales.deleteMany({ userId: "67e1bd19ab076dcf5d90ef57" });

        const testData = [
            {
                userId: "67e1bd19ab076dcf5d90ef57",
                productName: "Green Tea",
                currentPrice: 15.99,
                marketAverage: 14.99,
                trend: 5,
                margin: 35,
                elasticity: -1.2,
                monthlySales: [
                    { month: "2024-01", revenue: 1500, units: 100 },
                    { month: "2024-02", revenue: 1800, units: 120 },
                    { month: "2024-03", revenue: 2100, units: 140 }
                ],
                competitors: [
                    { name: "TeaCo", price: 14.99, marketShare: 30 },
                    { name: "TeaHouse", price: 16.99, marketShare: 25 }
                ]
            },
            {
                userId: "67e1bd19ab076dcf5d90ef57",
                productName: "Black Tea",
                currentPrice: 12.99,
                marketAverage: 13.99,
                trend: -2,
                margin: 40,
                elasticity: -1.5,
                monthlySales: [
                    { month: "2024-01", revenue: 1200, units: 90 },
                    { month: "2024-02", revenue: 1300, units: 100 },
                    { month: "2024-03", revenue: 1100, units: 85 }
                ],
                competitors: [
                    { name: "TeaCo", price: 13.99, marketShare: 35 },
                    { name: "TeaHouse", price: 12.49, marketShare: 28 }
                ]
            }
        ];

        await Sales.insertMany(testData);
        console.log('Test data added successfully');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error adding test data:', error);
        process.exit(1);
    }
}

addTestData(); 