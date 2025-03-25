const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function createDevUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if dev user already exists
        const existingUser = await User.findOne({ email: 'dev@wombat.ai' });
        if (existingUser) {
            console.log('Dev user already exists');
            process.exit(0);
        }

        // Create dev user
        const devUser = new User({
            email: 'dev@wombat.ai',
            password: 'devpass123',
            name: 'Dev Account',
            role: 'admin'
        });

        await devUser.save();
        console.log('Dev user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating dev user:', error);
        process.exit(1);
    }
}

createDevUser(); 