// API Configuration
// For production deployment, replace the localhost URL with your backend URL
export const API_BASE_URL = "https://your-render-app-name.onrender.com"; // Change this to your Render backend URL

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/auth/admin-login`, // Special admin login
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  
  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/api/products/${id}`,
  
  // Admin Products
  ADMIN_PRODUCTS: `${API_BASE_URL}/api/admin/products/get`,
  ADMIN_ADD_PRODUCT: `${API_BASE_URL}/api/admin/products/add`,
  ADMIN_EDIT_PRODUCT: (id) => `${API_BASE_URL}/api/admin/products/edit/${id}`,
  ADMIN_DELETE_PRODUCT: (id) => `${API_BASE_URL}/api/admin/products/delete/${id}`,
  ADMIN_UPLOAD_IMAGE: `${API_BASE_URL}/api/admin/products/upload-image`,
  
  // Shop
  SHOP_PRODUCTS: `${API_BASE_URL}/api/shop/products`,
  CART: `${API_BASE_URL}/api/shop/cart`,
  ORDERS: `${API_BASE_URL}/api/shop/order`,
  ADDRESS: `${API_BASE_URL}/api/shop/address`,
  SEARCH: `${API_BASE_URL}/api/shop/search`,
  REVIEWS: `${API_BASE_URL}/api/shop/review`,
  
  // Common
  FEATURES: `${API_BASE_URL}/api/common/feature`,
};