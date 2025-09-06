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
        className="text-gray-400 hover:text-gray-600 text-xl"
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
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{weight}</p>

        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              -
            </button>
            <span className="font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Item Total */}
        <div className="text-right mt-2">
          <span className="text-lg font-bold text-gray-900">
            ${(price * quantity).toFixed(2)}
          </span>
          <p className="text-xs text-gray-500">per item</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
