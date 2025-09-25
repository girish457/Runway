import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Heart, ShoppingCart, Star } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, searchTerm]);

  useEffect(() => {
    filterProducts();
  }, [products, priceFilter]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PRODUCTS, {
        params: {
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          search: searchTerm || undefined,
          limit: 50
        }
      });
      
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under-1000':
          filtered = filtered.filter(product => product.price < 1000);
          break;
        case '1000-2000':
          filtered = filtered.filter(product => product.price >= 1000 && product.price <= 2000);
          break;
        case '2000-5000':
          filtered = filtered.filter(product => product.price >= 2000 && product.price <= 5000);
          break;
        case 'over-5000':
          filtered = filtered.filter(product => product.price > 5000);
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (productId) => {
    navigate(`/shop/product/${productId}`);
  };

  const calculateDiscount = (price, salePrice) => {
    if (!salePrice) return 0;
    return Math.round(((price - salePrice) / price) * 100);
  };

  const handleWishlist = (e, productId) => {
    e.stopPropagation();
    // TODO: Implement wishlist functionality
    console.log('Add to wishlist:', productId);
  };

  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our collection of ethnic and western wear</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="ethnic-wear">Ethnic Wear</SelectItem>
                <SelectItem value="western-wear">Western Wear</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-1000">Under ₹1,000</SelectItem>
                <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                <SelectItem value="over-5000">Over ₹5,000</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const discount = calculateDiscount(product.price, product.salePrice);
              return (
                <Card 
                  key={product._id} 
                  className="group cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleProductClick(product._id)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.mainImage}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          -{discount}%
                        </div>
                      )}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={(e) => handleWishlist(e, product._id)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                      
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.averageReview || 4)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.reviewCount || 0})
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {product.salePrice ? (
                          <>
                            <span className="text-lg font-bold text-red-600">₹{product.salePrice}</span>
                            <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {product.colors?.slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          {product.colors?.length > 4 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="h-8 px-3"
                          onClick={(e) => handleAddToCart(e, product._id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
