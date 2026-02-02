const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get admin details from user input or use defaults
    const email = await question('Enter admin email (default: admin@sitm.edu.in): ') || 'admin@sitm.edu.in';
    const firstName = await question('Enter first name (default: Admin): ') || 'Admin';
    const lastName = await question('Enter last name (default: User): ') || 'User';
    const password = await question('Enter password (default: admin123): ') || 'admin123';
    const role = await question('Enter role (admin/super_admin, default: admin): ') || 'admin';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log(`\n❌ User with email ${email} already exists!`);
      const overwrite = await question('Do you want to update this user? (y/N): ');
      
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Operation cancelled.');
        process.exit(0);
      }

      // Update existing user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      existingAdmin.firstName = firstName;
      existingAdmin.lastName = lastName;
      existingAdmin.password = hashedPassword;
      existingAdmin.role = role;
      existingAdmin.isActive = true;
      existingAdmin.isVerified = true;
      existingAdmin.emailVerifiedAt = new Date();

      await existingAdmin.save();
      console.log('\n✅ Admin user updated successfully!');
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create admin user
      const adminUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        userType: 'staff',
        isActive: true,
        isVerified: true,
        emailVerifiedAt: new Date(),
        staff: {
          department: 'admissions',
          designation: role === 'super_admin' ? 'Super Administrator' : 'Administrator',
          joiningDate: new Date(),
          permissions: role === 'super_admin' ? ['*'] : [
            'manage_students',
            'manage_admissions',
            'manage_contacts',
            'view_analytics'
          ]
        }
      });

      await adminUser.save();
      console.log('\n✅ Admin user created successfully!');
    }
    
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`👤 Role: ${role}`);
    console.log('🌐 Access admin portal at: http://localhost:5173/admin');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    rl.close();
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdminUser();