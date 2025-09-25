const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Validate that environment variables are properly set
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log("Cloudinary config:", {
  cloudName: cloudName ? "✓ Set" : "✗ Missing",
  apiKey: apiKey ? "✓ Set" : "✗ Missing",
  apiSecret: apiSecret ? "✓ Set" : "✗ Missing"
});

if (!cloudName || !apiKey || !apiSecret) {
  console.warn("Warning: Cloudinary environment variables are not properly configured!");
  console.warn("CLOUDINARY_CLOUD_NAME:", cloudName);
  console.warn("CLOUDINARY_API_KEY:", apiKey);
  console.warn("CLOUDINARY_API_SECRET:", apiSecret ? "Set" : "Missing");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file, folder = "mern-ecommerce") {
  try {
    // Validate that Cloudinary is properly configured
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary is not properly configured. Please check environment variables.");
    }

    console.log("Uploading image to Cloudinary...");
    
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder,
      allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
      secure: true,
      timeout: 120000, // 2 minutes timeout for large files
      chunk_size: 6000000, // 6MB chunks for large files
    });

    console.log("Cloudinary upload successful:", {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    
    // Provide more specific error messages
    let errorMessage = "Error uploading to Cloudinary. Please try again.";
    
    if (error.http_code === 401) {
      errorMessage = "Invalid Cloudinary API credentials. Please check your API key and secret.";
    } else if (error.http_code === 400) {
      if (error.message && error.message.includes("File size")) {
        errorMessage = "File is too large. Cloudinary free tier supports files up to 10MB. Please upload a smaller image.";
      } else {
        errorMessage = "Invalid file format. Please upload a valid image file (jpg, png, jpeg, webp, gif).";
      }
    } else if (error.message && error.message.includes("File size")) {
      errorMessage = "File is too large. Cloudinary free tier supports files up to 10MB. Please upload a smaller image.";
    } else if (error.message && error.message.includes("unsupported")) {
      errorMessage = "Unsupported file format. Please upload a valid image file (jpg, png, jpeg, webp, gif).";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit to match Cloudinary free tier
  }
});

module.exports = { upload, imageUploadUtil };