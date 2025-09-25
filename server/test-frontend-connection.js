const axios = require('axios');

// Test connection to the server
async function testConnection() {
  try {
    console.log('Testing connection to server...');
    
    // Test health check endpoint
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('Health check response:', healthResponse.data);
    
    // Test auth endpoint
    const authResponse = await axios.get('http://localhost:5000/api/auth/check-auth', {
      withCredentials: true
    });
    console.log('Auth check response:', authResponse.data);
    
    console.log('✅ Connection test successful!');
  } catch (error) {
    console.error('❌ Connection test failed:', error.response?.data || error.message);
  }
}

testConnection();