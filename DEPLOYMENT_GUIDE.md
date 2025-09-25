# MERN E-commerce Deployment Guide

This guide will help you deploy the MERN e-commerce application to production environments.

## Backend Deployment (Node.js + Express + MongoDB)

### 1. Environment Variables
Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
NODE_ENV=production
```

### 2. Deployment Platforms
You can deploy the backend to any of these platforms:

#### Render
1. Create a new Web Service
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start` (which runs `node server.js`)
5. Add environment variables in the dashboard

#### Railway
1. Create a new project
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables in the dashboard

#### Heroku
1. Create a new app
2. Connect your GitHub repository
3. Enable automatic deploys
4. Add environment variables in the settings

## Frontend Deployment (React + Vite)

### 1. Update API Configuration
Before building, update the `client/src/config/api.js` file:
- Change `API_BASE_URL` to your deployed backend URL

### 2. Build the Application
```bash
cd client
npm run build
```

This will generate a `dist/` folder with the production build.

### 3. Deployment Platforms

#### Vercel
1. Create a new project
2. Connect your GitHub repository
3. Set the build command: `npm run build`
4. Set the output directory: `dist`
5. Set the install command: `npm install`
6. Add environment variables if needed

#### Netlify
1. Create a new site
2. Connect your GitHub repository
3. Set the build command: `npm run build`
4. Set the publish directory: `dist`
5. Add environment variables if needed

## Deployment Steps

### 1. Deploy Backend First
1. Update the `.env` file with your production values
2. Deploy to your chosen platform (Render/Railway/Heroku)
3. Note the deployed backend URL

### 2. Update Frontend Configuration
1. Update `API_BASE_URL` in `client/src/config/api.js` with your deployed backend URL
2. Commit and push changes

### 3. Deploy Frontend
1. Deploy to your chosen platform (Vercel/Netlify)
2. Note the deployed frontend URL

### 4. Update CORS (Optional)
If needed, add your frontend URL to the `allowedOrigins` array in `server/server.js`:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-url.vercel.app", // Your Vercel URL
  "https://your-frontend-url.netlify.app"  // Your Netlify URL
];
```

## Testing the Deployment

After deployment, test the following:

1. **User Authentication**
   - Users can SignUp/Login
   - Check that JWT tokens are working correctly

2. **Admin Access**
   - Login with admin credentials: `admin12@gmail.com` / `admin123`
   - Admin Dashboard should load correctly

3. **Product Management**
   - Products load from MongoDB
   - Product images display correctly

4. **Cloudinary Integration**
   - Image uploads work correctly
   - Images are stored in Cloudinary

5. **Shopping Features**
   - Cart functionality works
   - Wishlist functionality works
   - Orders can be placed

## Common Issues and Solutions

### CORS Errors
- Ensure your frontend URL is added to the `allowedOrigins` array in `server.js`
- Check that the `Access-Control-Allow-Origin` header is properly set

### Environment Variables Not Loading
- Ensure all required environment variables are set in your deployment platform
- Check that there are no extra spaces or characters in the `.env` file

### Database Connection Issues
- Verify that your `MONGODB_URI` is correct
- Ensure that your MongoDB cluster allows connections from your deployment platform

### Image Upload Issues
- Verify Cloudinary credentials are correct
- Check that the Cloudinary account has sufficient storage

## Development Commands

To run the application locally for development:

```bash
# Install dependencies
npm run install:all

# Run both frontend and backend
npm run dev
```

This will start both the backend server on `http://localhost:5000` and the frontend development server on `http://localhost:5173`.