import React from "react";

function Sidebar({
  categories,
  brands,
  priceRanges,
  selectedCategory,
  selectedBrand,
  selectedPriceRange,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange
}) {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">CATEGORIES</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">BRANDS</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === brand}
                  onChange={() => onBrandChange(brand)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">PRICE</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPriceRange.label === range.label}
                  onChange={() => onPriceRangeChange(range)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Options */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">COLOR</h3>
          <div className="flex flex-wrap gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-red-500 hover:border-red-400"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-blue-500 hover:border-blue-400"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-green-500 hover:border-green-400"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-yellow-500 hover:border-yellow-400"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-purple-500 hover:border-purple-400"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-black hover:border-gray-400"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-white hover:border-gray-400"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-gray-500 hover:border-gray-400"></div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
