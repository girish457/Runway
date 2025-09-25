const axios = require('axios');

async function testAdminLogin() {
  try {
    console.log('Testing admin login...');
    
    const response = await axios.post('http://localhost:5009/api/auth/admin-login', {
      email: 'admin12@gmail.com',
      password: 'admin123'
    }, {
      withCredentials: true
    });
    
    console.log('Login response:', response.data);
    
    if (response.data.success) {
      console.log('✅ Admin login successful!');
      console.log('User:', response.data.user);
      console.log('Token:', response.data.token);
    } else {
      console.log('❌ Admin login failed:', response.data.message);
    }
  } catch (error) {
    console.log('❌ Admin login error:', error.response?.data || error.message);
  }
}

testAdminLogin();