import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Map route paths to page IDs
const routeToPageMap = {
  '/my-orders': 'orders',
  '/my-listings': 'listings',
  '/add-product': 'add-product',
  '/my-profile': 'profile'
};

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState('add-product');

  // Set active page based on current route
  useEffect(() => {
    const currentPageId = routeToPageMap[location.pathname] || 'add-product';
    setActivePage(currentPageId);
  }, [location.pathname]);

  // Form state management
  const [formData, setFormData] = useState({
    productTitle: '',
    description: '',
    category: '',
    price: '',
    images: []
  });

  const [errors, setErrors] = useState({});

  // Sidebar links configuration
  const sidebarLinks = [
    { id: 'orders', label: 'My Orders', slug: "/my-orders", active: true },
    { id: 'listings', label: 'My Listings', slug: '/my-listings', active: true },
    { id: 'add-product', label: 'Add Product', slug: '/add-product', active: true },
    { id: 'profile', label: 'My Profile', slug: '/my-profile', active: true },
    { id: 'logout', label: 'Logout', slug: '/logout', active: true }
  ];

  // Handle sidebar navigation
  const handleSidebarClick = (slug) => {
    navigate(slug);
  };

  // Predefined categories
  const categories = ['Clothing', 'Electronics', 'Furniture', 'Books', 'Other'];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Create preview URLs for the new files
      const newImages = files.map(file => ({
        file: file,
        id: Date.now() + Math.random(), // Simple unique ID
        preview: URL.createObjectURL(file),
        name: file.name
      }));

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
      
      // Clear error for image field
      if (errors.images) {
        setErrors(prev => ({
          ...prev,
          images: ''
        }));
      }
    }

    // Reset file input to allow selecting the same file again
    e.target.value = '';
  };

  // Remove image from the list
  const removeImage = (imageId) => {
    setFormData(prev => {
      const updatedImages = prev.images.filter(img => img.id !== imageId);
      // Revoke the object URL to free memory
      const imageToRemove = prev.images.find(img => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return {
        ...prev,
        images: updatedImages
      };
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.productTitle.trim()) {
      newErrors.productTitle = 'Product title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = 'At least one product image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    // Create submission data
    const submissionData = {
      productTitle: formData.productTitle.trim(),
      description: formData.description.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      images: formData.images.map(img => img.file) // Extract just the file objects
    };

    // Log the form data (simulating backend submission)
    console.log('Product submission data:', submissionData);

    // Show success message
    alert('Product added successfully!');

    // Clean up object URLs before resetting
    formData.images.forEach(img => {
      URL.revokeObjectURL(img.preview);
    });

    // Reset form
    setFormData({
      productTitle: '',
      description: '',
      category: '',
      price: '',
      images: []
    });
    setErrors({});

    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#F8F9FA] border-r border-gray-200 p-6">
        <nav className="space-y-2">
          {sidebarLinks.map((link) =>
            link.active ? (
              <button
                key={link.id}
                onClick={() => handleSidebarClick(link.slug)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-inter ${
                  activePage === link.id
                    ? 'text-[#2E8B57] bg-[#E6F4EF] font-medium'
                    : 'text-[#212529] hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ) : null
          )}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-[#212529] mb-8 text-center font-montserrat">
          Add New Product
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Title */}
            <div>
              <label htmlFor="productTitle" className="block text-sm font-medium text-[#212529] mb-2 font-inter">
                Product Title *
              </label>
              <input
                type="text"
                id="productTitle"
                name="productTitle"
                value={formData.productTitle}
                onChange={handleInputChange}
                placeholder="Enter product title"
                className={`w-full px-3 py-2 border ${errors.productTitle ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent font-inter placeholder-gray-400`}
              />
              {errors.productTitle && (
                <p className="text-red-500 text-sm mt-1 font-inter">{errors.productTitle}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#212529] mb-2 font-inter">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product in detail"
                rows={4}
                className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent font-inter placeholder-gray-400 resize-vertical`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1 font-inter">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#212529] mb-2 font-inter">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent font-inter`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1 font-inter">{errors.category}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-[#212529] mb-2 font-inter">
                Price (₹) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent font-inter placeholder-gray-400`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1 font-inter">{errors.price}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-[#212529] mb-2 font-inter">
                Product Images * (You can select multiple images)
              </label>
              
              {/* Display uploaded images */}
              {formData.images.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2 font-inter">Uploaded Images:</p>
                  <div className="grid grid-cols-4 gap-1 justify-items-center">
                    {formData.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                        >
                          ×
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b-lg truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative">
                <input
                  type="file"
                  id="image-upload"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className={`w-full border border-dashed ${errors.images ? 'border-red-500' : 'border-gray-300'} rounded-md p-6 text-center cursor-pointer hover:border-[#2E8B57] hover:bg-gray-50 transition-colors duration-200 block`}
                >
                  <div className="space-y-2">
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <div className="font-inter">
                      <div>
                        <p className="text-sm text-gray-600">Click to upload images</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                        <p className="text-xs text-gray-500">You can select multiple files at once</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              {errors.images && (
                <p className="text-red-500 text-sm mt-1 font-inter">{errors.images}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#2E8B57] text-white font-medium py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:ring-offset-2 transition-colors duration-200 font-inter"
              >
                Add Product
              </button>
            </div>

          </form>
        </div>
      </div>
      </div>

      {/* Custom Fonts Styles */}
      <style jsx>{`
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AddProduct;
