const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const verifyDevUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find or create dev user
    let devUser = await User.findOne({ email: 'dev@wombat.ai' });
    
    if (!devUser) {
      console.log('Creating dev user...');
      devUser = await User.create({
        email: 'dev@wombat.ai',
        password: 'devpassword123',
        name: 'Dev Account',
        role: 'admin'
      });
      console.log('Dev user created successfully');
    } else {
      console.log('Dev user found, updating password...');
      devUser.password = 'devpassword123';
      await devUser.save();
      console.log('Dev user password updated successfully');
    }

    // Verify the user can be found and password works
    const verifyUser = await User.findOne({ email: 'dev@wombat.ai' });
    const isMatch = await verifyUser.comparePassword('devpassword123');
    console.log('Password verification:', isMatch ? 'Success' : 'Failed');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

verifyDevUser(); 