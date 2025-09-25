const axios = require('axios');

async function testCookieAuth() {
  try {
    console.log('Testing cookie-based authentication flow...');
    
    // First, try to check if we're already authenticated
    console.log('\n1. Checking current auth status...');
    try {
      const checkResponse = await axios.get('http://localhost:5009/api/auth/check-auth', {
        withCredentials: true
      });
      console.log('Check auth response:', checkResponse.data);
    } catch (error) {
      console.log('Not currently authenticated (this is expected if not logged in)');
      console.log('Error:', error.response?.data || error.message);
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
    console.log('Set-Cookie header:', loginResponse.headers['set-cookie']);
    
    if (loginResponse.data.success) {
      console.log('✅ Admin login successful!');
      console.log('User:', loginResponse.data.user);
      
      // Extract the token cookie
      const cookies = loginResponse.headers['set-cookie'];
      let tokenCookie = '';
      if (cookies) {
        // Find the token cookie
        const tokenCookieHeader = cookies.find(cookie => cookie.startsWith('token='));
        if (tokenCookieHeader) {
          // Extract just the cookie name=value part
          tokenCookie = tokenCookieHeader.split(';')[0];
          console.log('Extracted token cookie:', tokenCookie);
        }
      }
      
      // Now try to check auth again with the cookie
      console.log('\n3. Checking auth status after login...');
      const checkResponse = await axios.get('http://localhost:5009/api/auth/check-auth', {
        withCredentials: true,
        headers: {
          'Cookie': tokenCookie
        }
      });
      console.log('Check auth response after login:', checkResponse.data);
      
      if (checkResponse.data.success) {
        console.log('✅ Auth check successful! User is authenticated.');
      } else {
        console.log('❌ Auth check failed after login.');
      }
    } else {
      console.log('❌ Admin login failed:', loginResponse.data.message);
    }
  } catch (error) {
    console.log('❌ Authentication flow error:', error.response?.data || error.message);
    if (error.response?.headers) {
      console.log('Response headers:', error.response.headers);
    }
  }
}

testCookieAuth();