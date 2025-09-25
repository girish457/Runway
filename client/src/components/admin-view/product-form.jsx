import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import PropTypes from 'prop-types';

const ProductForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00']
  });

  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { toast } = useToast();
  
  // Refs for file inputs
  const mainImageInputRef = useRef(null);
  const subImagesInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!mainImage) newErrors.mainImage = 'Main image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size should be less than 20MB",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImage({ file, preview: e.target.result });
        if (errors.mainImage) {
          setErrors(prev => ({ ...prev, mainImage: null }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Check if we would exceed the limit of 10 sub images
    if (subImages.length + files.length > 10) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 10 sub images",
        variant: "destructive"
      });
      return;
    }
    
    // Filter only image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select image files only",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file sizes (max 20MB each)
    const oversizedFiles = imageFiles.filter(file => file.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "Files too large",
        description: `The following files exceed 20MB: ${oversizedFiles.map(f => f.name).join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    const newSubImages = imageFiles.map(file => {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onload = (e) => {
          resolve({ file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newSubImages).then(images => {
      setSubImages(prev => [...prev, ...images]);
    });
  };

  const removeSubImage = (index) => {
    setSubImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    
    // Check if we would exceed the limit of 10 sub images
    if (subImages.length + files.length > 10) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 10 sub images",
        variant: "destructive"
      });
      return;
    }
    
    // Filter only image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please drop only image files",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file sizes (max 20MB each)
    const oversizedFiles = imageFiles.filter(file => file.size > 20 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "Files too large",
        description: `The following files exceed 20MB: ${oversizedFiles.map(f => f.name).join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    const newSubImages = imageFiles.map(file => {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onload = (e) => {
          resolve({ file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newSubImages).then(images => {
      setSubImages(prev => [...prev, ...images]);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formDataToSend = new FormData();
    
    // Add text fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('price', formData.price);
    if (formData.salePrice) {
      formDataToSend.append('salePrice', formData.salePrice);
    }
    formDataToSend.append('colors', JSON.stringify(formData.colors));
    formDataToSend.append('sizes', JSON.stringify(['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']));
    formDataToSend.append('totalStock', '0');

    // Add main image
    formDataToSend.append('mainImage', mainImage.file);

    // Add sub images
    subImages.forEach((image) => {
      formDataToSend.append('subImages', image.file);
    });

    try {
      await onSave(formDataToSend);
      toast({
        title: "Success",
        description: "Product saved successfully",
      });
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      // Provide more specific error messages
      let errorMessage = "Error saving product. Please try again.";
      
      // Check for specific error responses from backend
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Handle network errors
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        errorMessage = "Upload timed out. Please try again with a smaller file or check your internet connection.";
      } else if (error.message?.includes('Network Error')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Product</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="mainImage">Upload Display Image (Main Product Image)</Label>
              {errors.mainImage && (
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.mainImage}
                </div>
              )}
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  dragOver ? 'border-blue-500 bg-blue-50' : errors.mainImage ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => !mainImage && mainImageInputRef.current?.click()}
              >
                {mainImage ? (
                  <div className="space-y-2">
                    <img src={mainImage.preview} alt="Main product" className="w-32 h-32 object-cover mx-auto rounded" />
                    <Button type="button" variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      setMainImage(null);
                    }}>
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload main image (Max 20MB)</p>
                    <input
                      id="mainImage"
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      className="hidden"
                      ref={mainImageInputRef}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        mainImageInputRef.current?.click();
                      }}
                      className="cursor-pointer"
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sub Images Upload */}
            <div className="space-y-2">
              <Label>Upload Product Sub Images (Max 10 images, 20MB each)</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                  dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => subImagesInputRef.current?.click()}
              >
                <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag & drop or click to upload sub images</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleSubImageUpload}
                  className="hidden"
                  ref={subImagesInputRef}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    subImagesInputRef.current?.click();
                  }}
                  className="cursor-pointer"
                >
                  Choose Files
                </Button>
              </div>

              {/* Sub Images Preview */}
              {subImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {subImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image.preview} alt={`Sub image ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeSubImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                {errors.title && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.title}
                  </div>
                )}
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter product title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                {errors.description && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.description}
                  </div>
                )}
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                {errors.category && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.category}
                  </div>
                )}
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethnic-wear">Ethnic Wear</SelectItem>
                    <SelectItem value="western-wear">Western Wear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                {errors.brand && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.brand}
                  </div>
                )}
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Enter brand name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                {errors.price && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.price}
                  </div>
                )}
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Enter product price"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price (Optional)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={(e) => handleInputChange('salePrice', e.target.value)}
                  placeholder="Enter sale price"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Color Options */}
            <div className="space-y-2">
              <Label>Color Options</Label>
              <div className="flex gap-2 flex-wrap">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...formData.colors];
                        newColors[index] = e.target.value;
                        handleInputChange('colors', newColors);
                      }}
                      className="w-12 h-8 p-0 border-0"
                    />
                    {formData.colors.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          const newColors = formData.colors.filter((_, i) => i !== index);
                          handleInputChange('colors', newColors);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('colors', [...formData.colors, '#000000'])}
                >
                  Add Color
                </Button>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading product...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

ProductForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ProductForm;