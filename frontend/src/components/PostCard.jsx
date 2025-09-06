import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PostCard({ 
  id, 
  title, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  badge, 
  featuredImage // keeping for backward compatibility
}) {
  const displayImage = image || featuredImage;
  const navigate = useNavigate();
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent the Link navigation
    e.stopPropagation();
    
    // Add product to cart logic here
    console.log("Adding to cart:", { id, title, price, image: displayImage });
    
    // Navigate to cart page
    navigate("/cart");
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#FBBF24"/>
              <stop offset="50%" stopColor="#E5E7EB"/>
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <Link to={`/post/${id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
        <div className="relative">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
              badge === 'SALE' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              {badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-[#212529] mb-2 line-clamp-2 min-h-[3rem] font-inter">{title}</h3>
          {rating && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {renderStars(rating)}
              </div>
              {reviews && <span className="ml-2 text-sm text-gray-600 font-inter">({reviews})</span>}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-[#212529] font-inter">${price}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through font-inter">${originalPrice}</span>
              )}
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-[#2E8B57] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-inter"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Custom Fonts Styles */}
      <style jsx>{`
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </Link>
  );
}

export default PostCard;
