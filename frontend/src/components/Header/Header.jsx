import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const isLoggedIn = authStatus || false;

  // Navigation links configuration
  const navigationLinks = [
    { name: "Home", href: "/", slug: "/" },
    { name: "Sell", href: "/add-product", slug: "/add-product" },
    { name: "Cart", href: "/cart", slug: "/cart" },
    { name: "Profile", href: "/my-profile", slug: "/my-profile" }
  ];

  // Handle authentication button clicks
  const handleLogin = () => {
    console.log("Login clicked");
    navigate("/login");
  };

  const handleSignUp = () => {
    console.log("Sign Up clicked");
    navigate("/signup");
  };

  // Handle navigation link clicks
  const handleNavClick = (slug) => {
    navigate(slug);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Left Section - Logo */}
        <div className="flex-shrink-0">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-[#2E8B57] font-permanent-marker hover:text-green-700 transition-colors duration-200"
          >
            EcoFinds
          </button>
        </div>

        {/* Center Section - Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.slug)}
              className="text-[#212529] font-medium font-inter hover:text-[#2E8B57] transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2E8B57] transition-all duration-200 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Right Section - Authentication Actions */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn && !authStatus ? (
            <>
              <button
                onClick={handleLogin}
                className="text-[#2E8B57] hover:underline font-medium font-inter transition-all duration-200"
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="bg-[#2E8B57] hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg font-inter transition-colors duration-200"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/my-profile")}
                className="text-[#212529] hover:text-[#2E8B57] font-medium font-inter transition-colors duration-200"
              >
                My Account
              </button>
              <LogoutBtn />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center justify-center w-8 h-8 text-[#2E8B57]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
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
        .font-permanent-marker {
          font-family: 'Permanent Marker', cursive;
        }
      `}</style>
    </header>
  );
}

export default Header;
