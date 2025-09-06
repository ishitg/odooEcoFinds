import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Map route paths to page IDs
const routeToPageMap = {
  '/my-orders': 'orders',
  '/my-listings': 'listings',
  '/add-product': 'add-product',
  '/my-profile': 'profile'
};

const UserProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState('profile');

  // Set active page based on current route
  useEffect(() => {
    const currentPageId = routeToPageMap[location.pathname] || 'profile';
    setActivePage(currentPageId);
  }, [location.pathname]);

  // Sample user data
  const user = {
    name: "Parv Raj",
    email: "parvrajchauhan@gmail.com",
    phone: "9368228950"
  };

  // Sidebar links configuration
  const sidebarLinks = [
    { id: 'orders', label: 'My Orders', slug: "/my-orders", active: true },
    { id: 'listings', label: 'My Listings', slug: '/my-listings', active: true },
    { id: 'add-product', label: 'Add Product', slug: '/add-product', active: true },
    { id: 'profile', label: 'My Profile', slug: '/my-profile', active: true },
    { id: 'logout', label: 'Logout', slug: '/logout', active: true }
  ];

  // Quick access cards data
  const quickAccessCards = [
    {
      id: 'orders',
      title: 'My Orders',
      description: 'View, Modify And Track Orders',
      route: '/my-orders'
    },
    {
      id: 'listings',
      title: 'My Listings',
      description: 'View And Modify Your Product Listings',
      route: '/my-listings'
    },
    {
      id: 'profile',
      title: 'My Profile',
      description: 'Edit Personal Info And Change Password',
      route: '/my-profile',
      isActive: true
    },
    {
      id: 'support',
      title: 'Help & Support',
      description: 'Reach Out To Us',
      route: '/help-support'
    }
  ];

  // Handle sidebar navigation
  const handleSidebarClick = (slug) => {
    console.log(`Navigating to: ${slug}`);
    navigate(slug);
  };

  // Handle quick access card clicks
  const handleCardClick = (card) => {
    if (card.isActive) {
      console.log(`Already on: ${card.title}`);
      return;
    }
    console.log(`Navigating to: ${card.title}`);
    navigate(card.route);
  };

  // Handle edit profile button
  const handleEditProfile = () => {
    console.log('Edit Profile Clicked');
    // In a real app, this would navigate to an edit profile form
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row">
      {/* Left Sidebar */}
      <div className="w-full lg:w-64 bg-[#F8F9FA] border-r border-gray-200 p-6">
        {/* Navigation */}
        <nav className="space-y-2">
          {sidebarLinks.map((link) =>
            link.active ? (
              <button
                key={link.id}
                onClick={() => handleSidebarClick(link.slug)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-inter ${
                  activePage === link.id
                    ? 'text-[#2E8B57] bg-[#E6F4EF] font-medium'
                    : 'text-gray-600 hover:text-[#2E8B57] hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ) : null
          )}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-8">
        {/* Header Title */}
        <h1 className="text-3xl font-semibold text-[#212529] mb-8 font-montserrat">
          My Profile
        </h1>

        {/* User Info Card */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              {/* User Name */}
              <h2 className="text-xl font-bold text-[#212529] mb-2 font-inter">
                {user.name}
              </h2>
              
              {/* User Contact Info */}
              <div className="space-y-1">
                <p className="text-gray-600 font-inter">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600 font-inter">
                  <span className="font-medium">Phone:</span> {user.phone}
                </p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={handleEditProfile}
              className="border border-[#2E8B57] text-[#2E8B57] hover:bg-[#E6F4EF] px-6 py-2 rounded-lg transition-colors duration-200 font-inter font-medium"
            >
              EDIT PROFILE
            </button>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickAccessCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`bg-white shadow rounded-lg p-4 transition-all duration-200 ${
                card.isActive 
                  ? 'border-2 border-[#2E8B57] bg-[#E6F4EF] cursor-default' 
                  : 'cursor-pointer hover:shadow-md hover:border hover:border-[#2E8B57]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`font-semibold mb-2 font-inter ${
                    card.isActive ? 'text-[#2E8B57]' : 'text-[#212529]'
                  }`}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-inter">
                    {card.description}
                  </p>
                </div>
                
                {/* Arrow Icon */}
                {!card.isActive && (
                  <svg 
                    className="w-5 h-5 text-gray-400 mt-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                )}
                
                {/* Check Icon for Active Card */}
                {card.isActive && (
                  <svg 
                    className="w-5 h-5 text-[#2E8B57] mt-1" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Profile Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-[#2E8B57] font-inter">12</div>
            <div className="text-sm text-gray-600 font-inter">Total Orders</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-[#FF9F1C] font-inter">5</div>
            <div className="text-sm text-gray-600 font-inter">Active Listings</div>
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

export default UserProfilePage;
