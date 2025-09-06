import React from "react";
import { useNavigate } from "react-router-dom";

function CartSummary({ subtotal, tax = 0, shipping = 0, total }) {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    // Handle checkout logic
    console.log("Proceeding to checkout...");
  };
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-[#212529] mb-6 font-montserrat">CART TOTALS</h3>
      
      <div className="space-y-4">
        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-[#212529] font-inter">Shipping (3-5 Business Days)</span>
          <span className="font-medium font-inter text-[#212529]">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-[#212529] font-inter">TAX (estimated for the United States (US))</span>
          <span className="font-medium font-inter text-[#212529]">${tax.toFixed(2)}</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-[#212529] font-inter">Subtotal</span>
          <span className="font-medium font-inter text-[#212529]">${subtotal.toFixed(2)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-lg font-bold text-[#212529] font-inter">Total</span>
          <span className="text-lg font-bold text-[#212529] font-inter">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button 
        onClick={handleCheckout}
        className="w-full mt-6 bg-[#2E8B57] text-white py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg font-inter"
      >
        PROCEED TO CHECKOUT
      </button>

      {/* Continue Shopping */}
      <button 
        onClick={handleContinueShopping}
        className="w-full mt-3 border border-gray-300 text-[#212529] py-3 rounded-lg hover:bg-[#E6F4EF] hover:border-[#2E8B57] transition-colors duration-200 font-inter"
      >
        ← CONTINUE SHOPPING
      </button>

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
}

export default CartSummary;
