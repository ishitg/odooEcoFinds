import React, { useState } from "react";
import { Container, CartItem, CartSummary, CouponCode } from "../components";
import { useNavigate } from "react-router-dom";

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    title: "Simply Soluble Elevé Doll CBD Bath Bomb",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    price: 50.00,
    originalPrice: 60.00,
    quantity: 1,
    weight: "Mint | 100 mg / x1",
  },
  {
    id: 2,
    title: "Water Soluble CBD Powder",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    price: 60.00,
    originalPrice: 80.00,
    quantity: 1,
    weight: "100 mg / x1",
  }
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleApplyCoupon = (couponCode) => {
    console.log("Applying coupon:", couponCode);
    // Add coupon logic here
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = 0; // Can be calculated based on location
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <Container>
          <div className="py-8">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="flex items-center text-[#212529] hover:text-[#2E8B57] mb-8 font-inter transition-colors duration-200"
            >
              ← Back
            </button>

            {/* Empty Cart */}
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold text-[#212529] mb-4 font-montserrat">YOUR CART</h1>
              <p className="text-[#212529] mb-8 font-inter">Your cart is empty</p>
              <button
                onClick={() => navigate("/")}
                className="bg-[#2E8B57] text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-inter"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Container>
        <div className="py-8">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="flex items-center text-[#212529] hover:text-[#2E8B57] mb-8 font-inter transition-colors duration-200"
          >
            ← Back
          </button>

          {/* Page Title */}
          <h1 className="text-4xl font-bold text-[#212529] mb-8 font-montserrat">YOUR CART</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Coupon Code Section */}
              <CouponCode onApplyCoupon={handleApplyCoupon} />
            </div>

            {/* Cart Summary Section */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        </div>
      </Container>

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

export default Cart;