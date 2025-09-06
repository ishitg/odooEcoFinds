import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Local state management
  const [quantity, setQuantity] = useState(1);
  const [selectedPackSize, setSelectedPackSize] = useState('1 kg');

  // Sample product data - in real app, this would be fetched based on ID
  const product = {
    id: id || 1,
    title: "fresho! Banana - Robusta, 1 kg",
    category: "Fresh Fruits",
    seller: "Organic Farms Co-op",
    description: "Freshly picked robusta bananas, rich in potassium and other essential nutrients. These premium quality bananas are carefully selected and packed to ensure maximum freshness. Perfect for smoothies, baking, or enjoying as a healthy snack. Our bananas are sustainably grown without harmful pesticides, supporting both your health and the environment.",
    price: 55,
    originalPrice: 78,
    unit: "kg",
    imageUrl: "",
    highlights: [
      "Rich in Potassium",
      "100% Organic",
      "Locally Sourced",
      "No Pesticides",
      "Fresh & Natural"
    ],
    packSizes: ['500g', '1 kg', '2 kg', '5 kg']
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Handle add to cart
  const handleAddToCart = () => {
    console.log(`Added to cart: Product ID ${product.id}, Quantity: ${quantity}, Pack Size: ${selectedPackSize}`);
    alert(`Added ${quantity} x ${product.title} (${selectedPackSize}) to cart!`);
  };

  // Handle navigation back
  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm font-inter">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-[#2E8B57] transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button 
              onClick={() => navigate('/category')}
              className="text-gray-500 hover:text-[#2E8B57] transition-colors"
            >
              {product.category}
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackNavigation}
          className="mb-6 flex items-center text-[#2E8B57] hover:text-green-700 transition-colors font-inter"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Product Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Product Image */}
          <div className="w-full">
            <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center border-2 border-gray-300">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 font-inter">Product Image</p>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="w-full">
            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-[#212529] mb-4 font-playfair">
              {product.title}
            </h1>

            {/* Seller Info */}
            <p className="text-gray-600 mb-6 font-inter">
              Sold by: <span className="font-medium text-[#2E8B57]">{product.seller}</span>
            </p>

            {/* Pricing Section */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-semibold text-[#212529] font-inter">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through font-inter">
                    ₹{product.originalPrice}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-[#FF9F1C] text-white px-3 py-1 rounded-full text-sm font-medium font-inter">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 font-inter">
                ₹{product.price} / {product.unit}
              </p>
            </div>

            {/* Pack Size Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#212529] mb-3 font-inter">
                Pack Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.packSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedPackSize(size)}
                    className={`px-4 py-2 border rounded-lg font-inter transition-colors ${
                      selectedPackSize === size
                        ? 'border-[#2E8B57] bg-[#E6F4EF] text-[#2E8B57]'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#2E8B57]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#212529] mb-3 font-inter">
                Quantity:
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent font-inter"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#2E8B57] hover:bg-green-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 font-inter text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Description & Highlights Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Description */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4 font-playfair">
              Product Description
            </h2>
            <p className="text-gray-700 leading-relaxed font-inter">
              {product.description}
            </p>
          </div>

          {/* Product Highlights */}
          <div>
            <h2 className="text-2xl font-bold text-[#212529] mb-4 font-playfair">
              Key Features
            </h2>
            <ul className="space-y-2">
              {product.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center text-gray-700 font-inter">
                  <svg className="w-5 h-5 text-[#2E8B57] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-[#212529] mb-4 font-playfair">
            Product Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 font-inter">Category</span>
              <span className="font-medium text-[#212529] font-inter">{product.category}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 font-inter">Unit</span>
              <span className="font-medium text-[#212529] font-inter">{product.unit}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 font-inter">Seller</span>
              <span className="font-medium text-[#212529] font-inter">{product.seller}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Fonts Styles */}
      <style jsx>{`
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Product;
