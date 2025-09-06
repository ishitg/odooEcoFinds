import React from "react";

function CartItem({ 
  id, 
  title, 
  image, 
  price, 
  originalPrice, 
  quantity, 
  weight,
  onQuantityChange, 
  onRemove 
}) {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onQuantityChange(id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 py-6 border-b border-gray-200">
      {/* Remove button */}
      <button
        onClick={() => onRemove(id)}
        className="text-gray-400 hover:text-[#2E8B57] text-xl transition-colors duration-200"
      >
        ×
      </button>

      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-[#212529] mb-1 font-inter">{title}</h3>
        <p className="text-sm text-gray-500 font-inter">{weight}</p>

        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-[#212529] font-inter">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through font-inter">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#E6F4EF] hover:border-[#2E8B57] transition-colors duration-200 font-inter"
            >
              -
            </button>
            <span className="font-medium w-8 text-center font-inter text-[#212529]">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#E6F4EF] hover:border-[#2E8B57] transition-colors duration-200 font-inter"
            >
              +
            </button>
          </div>
        </div>

        {/* Item Total */}
        <div className="text-right mt-2">
          <span className="text-lg font-bold text-[#212529] font-inter">
            ${(price * quantity).toFixed(2)}
          </span>
          <p className="text-xs text-gray-500 font-inter">per item</p>
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

export default CartItem;
