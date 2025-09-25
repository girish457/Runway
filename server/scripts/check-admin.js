const mongoose = require("mongoose");
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
  const user = await User.findOne({ email });
  if (user) {
    console.log("User found:");
    console.log("Email:", user.email);
    console.log("Username:", user.userName);
    console.log("Role:", user.role);
    console.log("Password (hashed):", user.password);
  } else {
    console.log("User not found");
  }
  
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});