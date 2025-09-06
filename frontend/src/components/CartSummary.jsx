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
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">CART TOTALS</h3>
      
      <div className="space-y-4">
        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping (3-5 Business Days)</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">TAX (estimated for the United States (US))</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button 
        onClick={handleCheckout}
        className="w-full mt-6 bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg"
      >
        PROCEED TO CHECKOUT
      </button>

      {/* Continue Shopping */}
      <button 
        onClick={handleContinueShopping}
        className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
      >
        ← CONTINUE SHOPPING
      </button>
    </div>
  );
}

export default CartSummary;
