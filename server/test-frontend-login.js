const axios = require('axios');

// Create an axios instance that matches the frontend configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Test admin login exactly like the frontend would do it
async function testFrontendAdminLogin() {
  try {
    console.log('Testing frontend-style admin login...');
    
    const formData = {
      email: 'admin12@gmail.com',
      password: 'admin123'
    };
    
    console.log('Sending admin login request with data:', formData);
    
    // This is what the frontend does - it calls the special admin login endpoint
    const response = await apiClient.post("/api/auth/admin-login", formData);
    
    console.log('Admin login response:', response.data);
    
    if (response.data.success) {
      console.log('✅ Admin login successful!');
      console.log('User:', response.data.user);
      console.log('Token:', response.data.token ? 'Received' : 'Not received');
      
      // Now test if we can access protected routes
      console.log('Testing access to protected route...');
      try {
        const authResponse = await apiClient.get("/api/auth/check-auth");
        console.log('Auth check response:', authResponse.data);
        if (authResponse.data.success) {
          console.log('✅ Auth check successful!');
        } else {
          console.log('❌ Auth check failed:', authResponse.data.message);
        }
      } catch (authError) {
        console.log('❌ Auth check failed:', authError.response?.data || authError.message);
      }
    } else {
      console.log('❌ Admin login failed:', response.data.message);
    }
  } catch (error) {
    console.error('❌ Admin login error:', error.response?.data || error.message);
  }
}

// Also test the regular login path for admin
async function testRegularAdminLogin() {
  try {
    console.log('\nTesting regular login path for admin...');
    
    const formData = {
      email: 'admin12@gmail.com',
      password: 'admin123'
    };
    
    console.log('Sending regular login request with data:', formData);
    
    // This is what the frontend does when it goes through the regular login path
    const response = await apiClient.post("/api/auth/login", formData);
    
    console.log('Regular login response:', response.data);
    
    if (response.data.success) {
      console.log('✅ Regular login successful!');
      console.log('User:', response.data.user);
      console.log('Token:', response.data.token ? 'Received' : 'Not received');
    } else {
      console.log('❌ Regular login failed:', response.data.message);
    }
  } catch (error) {
    console.error('❌ Regular login error:', error.response?.data || error.message);
  }
}

async function runTests() {
  await testFrontendAdminLogin();
  await testRegularAdminLogin();
}

runTests();