import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Map route paths to page IDs
const routeToPageMap = {
  '/my-orders': 'orders',
  '/my-listings': 'listings',
  '/add-product': 'add-product',
  '/my-profile': 'profile'
};

const My_Listings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState('listings');

  // Set active page based on current route
  useEffect(() => {
    const currentPageId = routeToPageMap[location.pathname] || 'listings';
    setActivePage(currentPageId);
  }, [location.pathname]);

  // Sample listings data
  const listingsData = [
    {
      id: 1,
      title: "Organic Cotton Eco-Friendly T-Shirt",
      description: "Made from 100% organic cotton, this sustainable t-shirt is perfect for eco-conscious fashion lovers. Soft, breathable, and ethically produced.",
      price: 899,
      originalPrice: 1299,
      category: "Clothing",
      condition: "New",
      sold: false,
      views: 45,
      listedDate: "2 days ago",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
      size: "M, L, XL",
      brand: "EcoWear",
      material: "Organic Cotton"
    },
    {
      id: 2,
      title: "Bamboo Fiber Reusable Water Bottle",
      description: "Eco-friendly water bottle made from sustainable bamboo fiber. BPA-free, leak-proof, and perfect for daily hydration needs.",
      price: 450,
      originalPrice: 650,
      category: "Home & Kitchen",
      condition: "New",
      sold: true,
      views: 89,
      listedDate: "5 days ago",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
      capacity: "500ml",
      brand: "BambooLife",
      material: "Bamboo Fiber"
    },
    {
      id: 3,
      title: "Solar Powered Portable Charger",
      description: "Harness the power of the sun with this portable solar charger. Perfect for outdoor adventures and emergency backup power.",
      price: 1599,
      originalPrice: 2299,
      category: "Electronics",
      condition: "Like New",
      sold: false,
      views: 67,
      listedDate: "1 week ago",
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop&crop=center",
      capacity: "10000mAh",
      brand: "SolarTech",
      features: "Waterproof, Fast Charging"
    },
    {
      id: 4,
      title: "Recycled Plastic Outdoor Furniture Set",
      description: "Beautiful outdoor furniture made entirely from recycled plastic. Weather-resistant and environmentally friendly.",
      price: 8999,
      originalPrice: 12999,
      category: "Furniture",
      condition: "Good",
      sold: true,
      views: 123,
      listedDate: "2 weeks ago",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
      pieces: "Table + 4 Chairs",
      brand: "GreenHome",
      material: "100% Recycled Plastic"
    }
  ];

  const sidebarLinks = [
    { id: 'orders', label: 'My Orders', slug: "/my-orders", active: true },
    { id: 'listings', label: 'My Listings', slug: '/my-listings', active: true },
    { id: 'add-product', label: 'Add Product', slug: '/add-product', active: true },
    { id: 'profile', label: 'My Profile', slug: '/my-profile', active: true },
    { id: 'logout', label: 'Logout', slug: '/logout', active: true }
  ];

  const handleSidebarClick = (slug) => {
    navigate(slug);
  };

  const renderListingCard = (listing) => (
    <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm relative">
      {/* Sold Badge */}
      {listing.sold && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-[#DC3545] text-white px-3 py-1 rounded-full text-sm font-medium">
            SOLD
          </span>
        </div>
      )}
      
      <div className="flex gap-6">
        {/* Left Image */}
        <div className="flex-shrink-0">
          <img 
            src={listing.image} 
            alt={listing.title}
            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Title and Status */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-[#212529] font-inter pr-4">
              {listing.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                listing.sold 
                  ? 'text-[#DC3545] bg-[#F8D7DA]' 
                  : 'text-[#2E8B57] bg-[#E6F4EF]'
              }`}>
                {listing.sold ? 'Sold' : 'Active'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 font-inter line-clamp-2">
            {listing.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold text-[#212529] font-inter">
              ₹{listing.price}
            </span>
            {listing.originalPrice && (
              <span className="text-lg text-gray-500 line-through font-inter">
                ₹{listing.originalPrice}
              </span>
            )}
            {listing.originalPrice && (
              <span className="text-sm text-[#2E8B57] font-medium">
                {Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)}% off
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-gray-600 text-sm font-inter">Category: </span>
              <span className="text-[#212529] text-sm font-medium font-inter">{listing.category}</span>
            </div>
            <div>
              <span className="text-gray-600 text-sm font-inter">Condition: </span>
              <span className="text-[#212529] text-sm font-medium font-inter">{listing.condition}</span>
            </div>
            {listing.brand && (
              <div>
                <span className="text-gray-600 text-sm font-inter">Brand: </span>
                <span className="text-[#212529] text-sm font-medium font-inter">{listing.brand}</span>
              </div>
            )}
            {listing.material && (
              <div>
                <span className="text-gray-600 text-sm font-inter">Material: </span>
                <span className="text-[#212529] text-sm font-medium font-inter">{listing.material}</span>
              </div>
            )}
          </div>

          {/* Stats and Actions */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-600 font-inter">
              <span>{listing.views} views</span>
              <span>Listed {listing.listedDate}</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-[#2E8B57] border border-[#2E8B57] rounded-lg text-sm font-medium font-inter hover:bg-[#E6F4EF] transition-colors">
                Edit
              </button>
              {!listing.sold && (
                <button className="px-4 py-2 bg-[#FF9F1C] text-white rounded-lg text-sm font-medium font-inter hover:bg-[#E8890B] transition-colors">
                  Mark as Sold
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (activePage === 'listings') {
      const activeListing = listingsData.filter(item => !item.sold);
      const soldListings = listingsData.filter(item => item.sold);
      
      return (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#212529] font-montserrat">
              My Listings
            </h1>
            <button 
              onClick={() => navigate('/add-product')}
              className="px-6 py-3 bg-[#2E8B57] text-white rounded-lg font-medium font-inter hover:bg-[#236B43] transition-colors"
            >
              + Add New Listing
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2E8B57] font-inter">{activeListing.length}</div>
              <div className="text-gray-600 text-sm font-inter">Active Listings</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#DC3545] font-inter">{soldListings.length}</div>
              <div className="text-gray-600 text-sm font-inter">Sold Items</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#FF9F1C] font-inter">
                {listingsData.reduce((total, item) => total + item.views, 0)}
              </div>
              <div className="text-gray-600 text-sm font-inter">Total Views</div>
            </div>
          </div>

          {/* Listings */}
          <div className="space-y-4">
            {listingsData.map(renderListingCard)}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="text-3xl font-bold text-[#212529] mb-8 font-montserrat">
            {sidebarLinks.find(link => link.id === activePage)?.label || 'Page'}
          </h1>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600 font-inter">
              This section is coming soon.
            </p>
          </div>
        </div>
      );
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
      <div className="flex-1 p-8">
        {renderMainContent()}
      </div>

      {/* Custom Fonts Styles */}
      <style jsx>{`
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default My_Listings;
