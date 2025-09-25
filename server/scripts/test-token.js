const mongoose = require("mongoose");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const jwt = require("jsonwebtoken");

async function run() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDM4YTE3YTZmZGQzZmY2N2QwMDg3OCIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW4xMkBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IkFkbWluIiwiaWF0IjoxNzU4Nzc5OTUwLCJleHAiOjE3NTkzODQ3NTB9.GDQ_M4iZP3uBdc6px-z9IvMrCT9u4W4ybfpX6OsRSxs";
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_jwt_secret");
    console.log("Decoded token:", decoded);
    console.log("Role:", decoded.role);
  } catch (error) {
    console.error("Token verification error:", error);
  }
}

run().catch(console.error);