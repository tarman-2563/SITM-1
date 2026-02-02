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
    
    // Ask for department
    console.log('\nAvailable departments:');
    console.log('1. admissions (default)');
    console.log('2. general');
    console.log('3. accounts');
    console.log('4. library');
    console.log('5. placement');
    console.log('6. CSE');
    console.log('7. ECE');
    console.log('8. ME');
    console.log('9. CE');
    console.log('10. BCA');
    console.log('11. BBA');
    const deptChoice = await question('Select department (1-11, default: 1): ') || '1';
    
    const departments = {
      '1': 'admissions',
      '2': 'general', 
      '3': 'accounts',
      '4': 'library',
      '5': 'placement',
      '6': 'CSE',
      '7': 'ECE',
      '8': 'ME',
      '9': 'CE',
      '10': 'BCA',
      '11': 'BBA'
    };
    
    const department = departments[deptChoice] || 'admissions';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log(`\n❌ User with email ${email} already exists!`);
      console.log(`Current details: ${existingAdmin.firstName} ${existingAdmin.lastName} (${existingAdmin.role})`);
      const overwrite = await question('Do you want to update this user? (y/N): ');
      
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Operation cancelled.');
        process.exit(0);
      }

      // Update existing user (password will be hashed by pre-save hook)
      existingAdmin.firstName = firstName;
      existingAdmin.lastName = lastName;
      existingAdmin.password = password; // Don't hash manually
      existingAdmin.role = role;
      existingAdmin.isActive = true;
      existingAdmin.isVerified = true;
      existingAdmin.emailVerifiedAt = new Date();
      
      // Update staff department if provided
      if (existingAdmin.staff) {
        existingAdmin.staff.department = department;
        existingAdmin.staff.designation = role === 'super_admin' ? 'Super Administrator' : 'Administrator';
      }

      await existingAdmin.save();
      console.log('\n✅ Admin user updated successfully!');
      console.log(`📧 Email: ${email}`);
      console.log(`👤 Name: ${firstName} ${lastName}`);
      console.log(`🏢 Department: ${department}`);
      console.log(`🔑 Role: ${role}`);
      if (existingAdmin.staff?.employeeId) {
        console.log(`🆔 Employee ID: ${existingAdmin.staff.employeeId}`);
      }
    } else {
      // Create admin user (password will be hashed by pre-save hook)
      const adminUser = new User({
        firstName,
        lastName,
        email,
        password, // Don't hash manually - let the pre-save hook handle it
        role,
        userType: 'staff',
        isActive: true,
        isVerified: true,
        emailVerifiedAt: new Date(),
        staff: {
          department: department,
          designation: role === 'super_admin' ? 'Super Administrator' : 'Administrator',
          joiningDate: new Date(),
          permissions: role === 'super_admin' ? [
            'manage_students',
            'manage_admissions',
            'manage_contacts',
            'manage_programs',
            'manage_gallery',
            'manage_placements',
            'manage_faculty',
            'manage_users',
            'view_analytics',
            'manage_fees',
            'manage_library',
            'manage_exams',
            'manage_attendance'
          ] : [
            'manage_students',
            'manage_admissions',
            'manage_contacts',
            'view_analytics'
          ]
        }
      });

      await adminUser.save();
      console.log('\n✅ Admin user created successfully!');
      console.log(`📧 Email: ${email}`);
      console.log(`👤 Name: ${firstName} ${lastName}`);
      console.log(`🏢 Department: ${department}`);
      console.log(`🔑 Role: ${role}`);
      console.log(`🆔 Employee ID: ${adminUser.staff.employeeId}`);
    }
    
    console.log(`🔐 Password: ${password}`);
    console.log('🌐 Access admin portal at: http://localhost:5173/admin');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('Error creating admin user:', error);
    
    // Provide more specific error messages
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        console.error('❌ This email address is already registered.');
      } else if (error.keyPattern?.['staff.employeeId']) {
        console.error('❌ Employee ID conflict. Please try again.');
      } else {
        console.error('❌ Duplicate entry detected.');
      }
    }
  } finally {
    rl.close();
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdminUser();