# Deployment Guide for MERN E-commerce Application

## Backend Deployment on Render

### 1. Prepare the Server for Deployment

The server is already configured to work with Render. The key configurations are:
- Uses `process.env.PORT || 5000` for port configuration
- Has a proper `start` script in `package.json` (`node server.js`)
- Has a `render.yaml` file for easy deployment

### 2. Deploy to Render

1. Push your code to a GitHub repository
2. Go to [Render](https://render.com) and create an account or sign in
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Fill in the following information:
   - Name: Choose a name for your web service
   - Region: Choose the region closest to you
   - Branch: main (or master)
   - Root Directory: server
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add the following environment variables in the "Advanced" section:
   ```
   PORT=5000
   MONGODB_URI=your_actual_mongodb_atlas_uri
   JWT_SECRET=mySuperSecretKey
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=diwbv1xcb
   CLOUDINARY_API_KEY=146582574698153
   CLOUDINARY_API_SECRET=yiOWLRYMj4fA8gyUv7xScrOwwRk
   ```
7. Click "Create Web Service"

### 3. After Deployment

Once deployed, Render will provide you with a URL like:
`https://your-app-name.onrender.com`

## Frontend Deployment on Netlify

### 1. Update API Configuration

Before deploying the frontend, you need to update the API URL:

1. Open `client/src/config/api.js`
2. Replace `https://your-render-app-name.onrender.com` with your actual Render backend URL
3. Save the file

### 2. Build the Frontend

1. Navigate to the client directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Build the application:
   ```
   npm run build
   ```

### 3. Deploy to Netlify

1. Go to [Netlify](https://netlify.com) and create an account or sign in
2. Install the Netlify CLI (optional but recommended):
   ```
   npm install -g netlify-cli
   ```
3. If using Netlify CLI:
   - Run `netlify login` to authenticate
   - Run `netlify init` to create a new site
   - Run `netlify deploy --prod` to deploy the site
4. If using the web interface:
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set the following configuration:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables if needed
   - Click "Deploy site"

## Final Integration Steps

### 1. Update CORS (if needed)

If you encounter CORS issues after deployment, update the `allowedOrigins` array in `server/server.js` to include your Netlify URL:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  // ... other local URLs
  "https://your-netlify-url.netlify.app"  // Add your Netlify URL here
];
```

Then redeploy the backend on Render.

### 2. Testing

After both deployments are complete:

1. Visit your Netlify frontend URL
2. Test user authentication:
   - Sign up for a new account
   - Log in with your account
   - Access the account page
3. Test admin functionality:
   - Log in with admin credentials:
     - Email: admin12@gmail.com
     - Password: admin123
   - Access the admin dashboard
   - Test product management features
   - Test Cloudinary image uploads

### 3. Common Issues and Solutions

#### CORS Errors
- Ensure your Netlify URL is added to the `allowedOrigins` array in `server.js`
- Redeploy the backend after making changes

#### API Connection Issues
- Verify that your Render backend URL is correctly set in `client/src/config/api.js`
- Check that all environment variables are properly set in Render

#### Image Upload Issues
- Verify Cloudinary credentials are correct
- Check that the Cloudinary account has sufficient storage

## Environment Variables Summary

### Render Backend Variables
```
PORT=5000
MONGODB_URI=your_actual_mongodb_atlas_uri
JWT_SECRET=mySuperSecretKey
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=diwbv1xcb
CLOUDINARY_API_KEY=146582574698153
CLOUDINARY_API_SECRET=yiOWLRYMj4fA8gyUv7xScrOwwRk
```

### Frontend Configuration
Update `API_BASE_URL` in `client/src/config/api.js` with your Render backend URL.