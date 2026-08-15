// Run with: npm run seed:admin
// Creates (or updates) the admin account defined in your .env file.
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

dotenv.config();

(async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first.');
    process.exit(1);
  }

  let admin = await Admin.findOne({ email });
  if (admin) {
    admin.password = password;
    await admin.save();
    console.log(`Existing admin ${email} password updated.`);
  } else {
    admin = await Admin.create({ name: 'Admin', email, password });
    console.log(`Admin account created for ${email}.`);
  }

  process.exit(0);
})();
