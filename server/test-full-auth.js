const axios = require('axios');

async function testFullAuthFlow() {
  try {
    console.log('Testing full authentication flow...');
    
    // First, try to check if we're already authenticated
    console.log('\n1. Checking current auth status...');
    try {
      const checkResponse = await axios.get('http://localhost:5009/api/auth/check-auth', {
        withCredentials: true
      });
      console.log('Check auth response:', checkResponse.data);
    } catch (error) {
      console.log('Not currently authenticated (this is expected if not logged in)');
    }
    
    // Now try admin login
    console.log('\n2. Attempting admin login...');
    const loginResponse = await axios.post('http://localhost:5009/api/auth/admin-login', {
      email: 'admin12@gmail.com',
      password: 'admin123'
    }, {
      withCredentials: true
    });
    
    console.log('Login response:', loginResponse.data);
    
    if (loginResponse.data.success) {
      console.log('✅ Admin login successful!');
      console.log('User:', loginResponse.data.user);
      
      // Now try to check auth again
      console.log('\n3. Checking auth status after login...');
      const checkResponse = await axios.get('http://localhost:5009/api/auth/check-auth', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${loginResponse.data.token}`
        }
      });
      console.log('Check auth response after login:', checkResponse.data);
    } else {
      console.log('❌ Admin login failed:', loginResponse.data.message);
    }
  } catch (error) {
    console.log('❌ Authentication flow error:', error.response?.data || error.message);
  }
}

testFullAuthFlow();