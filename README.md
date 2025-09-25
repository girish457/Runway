# MERN E-commerce Admin Panel - Product Management

A complete solution for an admin panel product page with Cloudinary image storage and large file support (up to 20MB per image).

## Features

- Upload product images larger than 5MB (up to 20MB per image)
- Use Cloudinary for storing images
- Save product details (title, price, description, category, images array) into MongoDB
- Backend in Node.js + Express with Mongoose
- File uploads via multer + Cloudinary SDK
- Frontend in React with responsive product form
- Image preview, upload progress, error handling
- Show newly added product immediately in frontend product list
- Fixed issues with file size limits and error messages

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account

## Environment Variables

### Server (.env file in server directory)

```env
PORT=5000
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mern-ecommerce-2024-master
```

2. Install all dependencies:
```bash
npm run install:all
```

## Running the Application

### Development Mode

To run both frontend and backend together:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:5173

### Start the Server Only

```bash
cd server
npm start
```

The server will start on http://localhost:5000

### Start the Client Only

```bash
cd client
npm run dev
```

The client will start on http://localhost:5173

## Deployment

### Backend Deployment

1. Update the `.env` file in the `server` directory with production values
2. Deploy to your preferred platform (Render, Railway, or Heroku)
3. Set the start command to `npm start`
4. Add all environment variables to your deployment platform

### Frontend Deployment

1. Update `API_BASE_URL` in `client/src/config/api.js` with your deployed backend URL
2. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
3. Deploy the `client/dist` folder to Vercel or Netlify
4. Set the build command to `npm run build` and output directory to `dist`

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## Usage

1. Access the admin panel at http://localhost:5173/admin
2. Log in with admin credentials
3. Navigate to the Products section
4. Click "Add New Product" to open the product form
5. Fill in product details:
   - Upload a main image (required, max 20MB)
   - Upload up to 10 sub-images (optional, max 20MB each)
   - Enter product title, description, category, brand, price
   - Set sale price (optional)
   - Configure color options
6. Click "Save Product" to upload images to Cloudinary and save product to MongoDB

## Technical Implementation

### Backend (Node.js + Express)

- Uses multer with memory storage for handling file uploads
- Integrates with Cloudinary SDK for image storage
- Implements 20MB file size limit
- Stores product data in MongoDB using Mongoose
- RESTful API endpoints for product management

### Frontend (React)

- Responsive product form with image preview
- Drag and drop support for image uploads
- Upload progress indicators
- Comprehensive form validation
- Error handling with user-friendly messages
- Real-time product listing after saving

## API Endpoints

### Admin Products

- `GET /api/admin/products/get` - Fetch all products
- `POST /api/admin/products/add` - Add new product with images
- `PUT /api/admin/products/edit/:id` - Edit existing product
- `DELETE /api/admin/products/delete/:id` - Delete product

## Testing

To test the product upload functionality, you can use the admin panel UI or create a test script like the one below:

```javascript
// test-product-upload.js
const axios = require('axios');
const fs = require('fs');

async function testProductUpload() {
  try {
    const formData = new FormData();
    
    // Add product details
    formData.append('title', 'Test Product');
    formData.append('description', 'Test product description');
    formData.append('category', 'ethnic-wear');
    formData.append('brand', 'Test Brand');
    formData.append('price', '99.99');
    formData.append('colors', JSON.stringify(['#FF0000']));
    formData.append('sizes', JSON.stringify(['M', 'L']));
    
    // Add a test image file
    // formData.append('mainImage', fs.createReadStream('path/to/your/image.jpg'));
    
    const response = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Product upload response:', response.data);
  } catch (error) {
    console.error('Error during product upload test:', error.response?.data || error.message);
  }
}
```

## Troubleshooting

### File Size Issues

If you encounter "File size should be less than 5MB" errors:
- Ensure the server is using the updated middleware with 20MB limit
- Check that the client form validation allows 20MB files

### Cloudinary Upload Issues

If images aren't uploading to Cloudinary:
- Verify Cloudinary environment variables are correctly set
- Check Cloudinary account has sufficient storage
- Ensure internet connectivity for API calls

### CORS Issues

If you encounter CORS errors:
- Ensure the server has proper CORS configuration
- Check that frontend and backend URLs match allowed origins

## Dependencies

### Server

- express
- mongoose
- multer
- cloudinary
- cors
- dotenv

### Client

- react
- axios
- lucide-react
- tailwindcss
- shadcn/ui components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.