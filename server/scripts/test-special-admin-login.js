const axios = require('axios');

async function testSpecialAdminLogin() {
  try {
    console.log('Testing special admin login...');
    
    const response = await axios.post('http://localhost:5001/api/auth/admin-login', {
      email: 'admin12@gmail.com',
      password: 'admin123'
    }, {
      withCredentials: true
    });
    
    console.log('Admin login response:', response.data);
    
    if (response.data.success) {
      console.log('✅ Special admin login successful!');
      console.log('User:', response.data.user);
      console.log('Token:', response.data.token);
    } else {
      console.log('❌ Login failed:', response.data.message);
    }
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
  }
}

testSpecialAdminLogin();