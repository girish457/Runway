const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file provided"
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error || "Error uploading image to Cloudinary"
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading image",
      error: error.message
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      colors,
      sizes,
      totalStock = 0,
    } = req.body;

    console.log("Adding product with data:", {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    });

    // Parse colors and sizes if they come as strings
    const parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;

    console.log("Parsed colors:", parsedColors);
    console.log("Parsed sizes:", parsedSizes);

    // Handle main image upload to Cloudinary
    let mainImageUrl = null;
    if (req.files && req.files.mainImage && req.files.mainImage[0]) {
      console.log("Uploading main image...");
      const mainImageBuffer = req.files.mainImage[0].buffer;
      const mainImageB64 = Buffer.from(mainImageBuffer).toString("base64");
      const mainImageUrlData = "data:" + req.files.mainImage[0].mimetype + ";base64," + mainImageB64;
      
      const mainImageResult = await imageUploadUtil(mainImageUrlData);
      if (!mainImageResult.success) {
        return res.status(500).json({
          success: false,
          message: mainImageResult.error || "Error uploading main image to Cloudinary"
        });
      }
      mainImageUrl = mainImageResult.url;
      console.log("Main image uploaded:", mainImageUrl);
    }

    // Handle sub images upload to Cloudinary
    let subImageUrls = [];
    if (req.files && req.files.subImages && req.files.subImages.length > 0) {
      console.log("Uploading sub images...");
      for (const file of req.files.subImages) {
        const subImageBuffer = file.buffer;
        const subImageB64 = Buffer.from(subImageBuffer).toString("base64");
        const subImageUrlData = "data:" + file.mimetype + ";base64," + subImageB64;
        
        const subImageResult = await imageUploadUtil(subImageUrlData);
        if (subImageResult.success) {
          subImageUrls.push(subImageResult.url);
          console.log("Sub image uploaded:", subImageResult.url);
        } else {
          console.warn("Failed to upload sub image:", subImageResult.error);
          // Continue with other images even if one fails
        }
      }
    }

    if (!mainImageUrl) {
      return res.status(400).json({
        success: false,
        message: "Main image is required",
      });
    }

    const newlyCreatedProduct = new Product({
      title,
      description,
      category,
      brand,
      price: parseFloat(price),
      salePrice: salePrice ? parseFloat(salePrice) : null,
      colors: parsedColors,
      sizes: parsedSizes,
      mainImage: mainImageUrl,
      subImages: subImageUrls,
      totalStock: parseInt(totalStock),
      averageReview: 0,
      reviewCount: 0,
      status: 'active'
    });

    console.log("Saving product to database...");
    await newlyCreatedProduct.save();
    console.log("Product saved successfully:", newlyCreatedProduct._id);
    
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
      message: "Product created successfully"
    });
  } catch (e) {
    console.log("Error creating product:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while creating product",
      error: e.message
    });
  }
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
      message: "Products fetched successfully"
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
      error: e.message
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
      message: "Product updated successfully"
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while updating product",
      error: e.message
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting product",
      error: e.message
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};