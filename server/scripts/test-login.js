const mongoose = require("mongoose");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function run() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  const email = "admin12@gmail.com";
  const password = "admin123";
  
  let userDoc = await User.findOne({ email });
  console.log("User found:", userDoc.email, userDoc.role);

  // If special admin credentials are used, ensure admin user exists and bypass hash comparison
  const isAdminOverride = email === "admin12@gmail.com" && password === "admin123";
  console.log("isAdminOverride:", isAdminOverride);
  
  if (isAdminOverride) {
    if (!userDoc) {
      console.log("User not found, creating new admin user");
      const hashed = await bcrypt.hash(password, 12);
      userDoc = await User.create({
        userName: "Admin",
        email,
        password: hashed,
        role: "admin",
      });
    } else if (userDoc.role !== "admin") {
      console.log("Updating user role to admin");
      userDoc.role = "admin";
      await userDoc.save();
    }
  }

  if (!userDoc) {
    console.log("User doesn't exist");
    await mongoose.disconnect();
    return;
  }

  // If not admin override, validate password
  if (!isAdminOverride) {
    console.log("Validating password");
    const checkPasswordMatch = await bcrypt.compare(password, userDoc.password);
    if (!checkPasswordMatch) {
      console.log("Incorrect password");
      await mongoose.disconnect();
      return;
    }
  }

  const resolvedRole = isAdminOverride ? "admin" : userDoc.role;
  console.log("Resolved role:", resolvedRole);

  const token = jwt.sign(
    {
      id: userDoc._id,
      role: resolvedRole,
      email: userDoc.email,
      userName: userDoc.userName,
    },
    process.env.JWT_SECRET || "dev_jwt_secret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "60m" }
  );

  const responseUser = {
    id: userDoc._id,
    userName: userDoc.userName,
    email: userDoc.email,
    role: resolvedRole,
  };

  console.log("Login successful");
  console.log("Token:", token);
  console.log("User:", responseUser);
  
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});