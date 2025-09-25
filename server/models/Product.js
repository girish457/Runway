const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['ethnic-wear', 'western-wear', 'accessories', 'jewelry']
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    salePrice: {
      type: Number,
      min: 0,
      default: null
    },
    colors: [{
      type: String,
      required: true
    }],
    sizes: [{
      type: String,
      enum: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
      required: true
    }],
    mainImage: {
      type: String,
      required: true
    },
    subImages: [{
      type: String
    }],
    totalStock: {
      type: Number,
      default: 0,
      min: 0
    },
    averageReview: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
