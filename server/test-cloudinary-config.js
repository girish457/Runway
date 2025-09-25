const dotenv = require('dotenv');
dotenv.config();

console.log('Cloudinary Configuration Test');
console.log('============================');

// Check environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('Environment Variables:');
console.log('CLOUDINARY_CLOUD_NAME:', cloudName ? '✓ Set' : '✗ Missing');
console.log('CLOUDINARY_API_KEY:', apiKey ? '✓ Set' : '✗ Missing');
console.log('CLOUDINARY_API_SECRET:', apiSecret ? '✓ Set' : '✗ Missing');

if (!cloudName || !apiKey || !apiSecret) {
  console.log('\n❌ Cloudinary is not properly configured!');
  console.log('Please check your .env file and ensure all Cloudinary variables are set.');
  process.exit(1);
}

// Test Cloudinary connection
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

async function testCloudinary() {
  try {
    console.log('\nTesting Cloudinary connection...');
    
    // Test ping
    const pingResult = await cloudinary.api.ping();
    console.log('✅ Cloudinary ping successful:', pingResult);
    
    // Test folder creation (non-destructive)
    const folders = await cloudinary.api.root_folders();
    console.log('✅ Cloudinary API access successful');
    
    console.log('\n✅ Cloudinary is properly configured and working!');
  } catch (error) {
    console.log('\n❌ Cloudinary test failed:', error.message);
    
    if (error.http_code === 401) {
      console.log('Reason: Invalid API credentials');
    } else if (error.http_code === 403) {
      console.log('Reason: Insufficient permissions');
    } else {
      console.log('Reason:', error.message);
    }
    
    process.exit(1);
  }
}

testCloudinary();