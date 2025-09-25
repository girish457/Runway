const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const User = require("../models/User");

async function run() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  const email = "admin12@gmail.com";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin user already exists:", email);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash("admin123", 12);
  const admin = new User({
    userName: "Admin",
    email,
    password: passwordHash,
    role: "admin",
  });
  await admin.save();
  console.log("Admin user created:", email);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});


