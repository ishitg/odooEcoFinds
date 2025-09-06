import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6 mt-auto">
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

        {/* Center Section - Footer Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/about"
            className="text-[#212529] font-medium font-inter hover:text-[#2E8B57] transition-colors duration-200 relative group"
          >
            About Us
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2E8B57] transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            to="/contact"
            className="text-[#212529] font-medium font-inter hover:text-[#2E8B57] transition-colors duration-200 relative group"
          >
            Contact
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2E8B57] transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            to="/privacy"
            className="text-[#212529] font-medium font-inter hover:text-[#2E8B57] transition-colors duration-200 relative group"
          >
            Privacy Policy
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2E8B57] transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            to="/terms"
            className="text-[#212529] font-medium font-inter hover:text-[#2E8B57] transition-colors duration-200 relative group"
          >
            Terms & Conditions
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#2E8B57] transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Right Section - Copyright */}
        <div className="flex items-center">
          <p className="text-sm text-gray-600 font-inter">
            © 2025 EcoFinds. All rights reserved.
          </p>
        </div>
      </div>

      {/* Custom Fonts Styles */}
      <style jsx>{`
        .font-permanent-marker {
          font-family: 'Permanent Marker', cursive;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
