const mongoose = require('mongoose');
const Sales = require('../models/Sales');
require('dotenv').config();

async function checkData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const salesData = await Sales.find({ userId: "67e1bd19ab076dcf5d90ef57" });
        console.log('Found sales data:', salesData);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error checking data:', error);
        process.exit(1);
    }
}

checkData(); 