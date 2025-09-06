import React, { useState } from "react";

function CouponCode({ onApplyCoupon }) {
  const [couponCode, setCouponCode] = useState("");

  const handleApply = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim());
      setCouponCode("");
    }
  };

  const handleUpdateCart = () => {
    // Handle cart update logic
    console.log("Updating cart...");
  };

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <div className="flex flex-col md:flex-row gap-4 items-start justify-center items-center">
        {/* Coupon Section */}
        <div className="flex-1">
          <p className="text-[#212529] mb-2 font-inter">Have a coupon? Enter your code.</p>
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent font-inter"
            />
            <button
              type="submit"
              className="px-6 py-2 border border-gray-300 text-[#212529] rounded-lg hover:bg-[#E6F4EF] hover:border-[#2E8B57] transition-colors duration-200 font-inter"
            >
              APPLY
            </button>
          </form>
        </div>

        {/* Update Cart Button */}
        <div className="flex items-center">
          <button
            onClick={handleUpdateCart}
            className="px-6 py-2 text-[#212529] hover:text-[#2E8B57] transition-colors duration-200 flex items-center gap-2 font-inter"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            UPDATE CART
          </button>
        </div>
      </div>

      {/* Custom Fonts Styles */}
      <style jsx>{`
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}

export default CouponCode;
