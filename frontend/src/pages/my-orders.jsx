import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Map route paths to page IDs
const routeToPageMap = {
  '/my-orders': 'orders',
  '/my-listings': 'listings',
  '/add-product': 'add-product',
  '/my-profile': 'profile'
};

const My_Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState('orders');

  // Set active page based on current route
  useEffect(() => {
    const currentPageId = routeToPageMap[location.pathname] || 'orders';
    setActivePage(currentPageId);
  }, [location.pathname]);

  // Sample orders data
  const ordersData = [
    {
      id: 1,
      status: "Delivered",
      date: "1 Oct 2024",
      productName: "Men's Black One Thing Typography Oversized Acid Wash T-shirt",
      size: "L",
      price: 649,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      status: "Refunded",
      date: "15 Sep 2024",
      productName: "Men's Black Ashura Graphic Printed Oversized T-shirt",
      size: "M",
      price: 499,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      status: "Delivered",
      date: "28 Aug 2024",
      productName: "Eco-Friendly Bamboo Water Bottle",
      size: "500ml",
      price: 299,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center"
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

  const renderOrderCard = (order) => (
    <div 
      key={order.id} 
      onClick={() => navigate(`/product/${order.id}`)}
      className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm cursor-pointer hover:shadow-md hover:border-[#2E8B57] transition-all duration-200"
    >
      <div className="flex justify-between items-start">
        {/* Left Content */}
        <div className="flex-1 pr-4">
          {/* Status Badge */}
          <div className="mb-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Delivered'
                  ? 'text-[#2E8B57] bg-[#E6F4EF]'
                  : 'text-[#DC3545] bg-[#F8D7DA]'
              }`}
            >
              {order.status === 'Delivered' ? 'Order Delivered' : 'Refund Processed'}
            </span>
          </div>

          {/* Order Date */}
          <p className="text-gray-600 text-sm mb-4 font-inter">
            Order placed on {order.date}
          </p>

          {/* Divider */}
          <hr className="border-gray-200 mb-4" />

          {/* Product Details */}
          <div className="space-y-2">
            <h3 className="text-[#212529] font-semibold text-lg font-inter">
              {order.productName}
            </h3>
            <p className="text-gray-600 text-sm font-inter">
              Size: {order.size}
            </p>
            <p className="text-[#212529] font-medium text-sm font-inter">
              Price: ₹{order.price}
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0">
          <img 
            src={order.image} 
            alt={order.productName}
            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
          />
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (activePage === 'orders') {
      return (
        <div>
          <h1 className="text-3xl font-bold text-[#212529] mb-8 font-playfair">
            My Orders
          </h1>
          <div className="space-y-4">
            {ordersData.map(renderOrderCard)}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="text-3xl font-bold text-[#212529] mb-8 font-playfair">
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

export default My_Orders;
