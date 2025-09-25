const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../middleware/upload");

const router = express.Router();

// Legacy cloudinary upload endpoint
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// New product creation with local image upload
router.post("/add", upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'subImages', maxCount: 10 }
]), addProduct);

router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

module.exports = router;