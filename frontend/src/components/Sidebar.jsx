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
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4 border border-gray-200">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#212529] mb-4 font-montserrat">CATEGORIES</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="text-[#2E8B57] focus:ring-[#2E8B57]"
                />
                <span className="ml-2 text-[#212529] font-inter">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#212529] mb-4 font-montserrat">BRANDS</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === brand}
                  onChange={() => onBrandChange(brand)}
                  className="text-[#2E8B57] focus:ring-[#2E8B57]"
                />
                <span className="ml-2 text-[#212529] font-inter">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#212529] mb-4 font-montserrat">PRICE</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPriceRange.label === range.label}
                  onChange={() => onPriceRangeChange(range)}
                  className="text-[#2E8B57] focus:ring-[#2E8B57]"
                />
                <span className="ml-2 text-[#212529] font-inter">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Options */}
        <div>
          <h3 className="text-lg font-semibold text-[#212529] mb-4 font-montserrat">COLOR</h3>
          <div className="flex flex-wrap gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-red-500 hover:border-[#2E8B57]"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-blue-500 hover:border-[#2E8B57]"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-green-500 hover:border-[#2E8B57]"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-yellow-500 hover:border-[#2E8B57]"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-purple-500 hover:border-[#2E8B57]"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-black hover:border-[#2E8B57]"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-white hover:border-[#2E8B57]"></div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer bg-gray-500 hover:border-[#2E8B57]"></div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button className="w-full mt-6 bg-[#2E8B57] text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-inter">
          Apply Filters
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
    </div>
  );
}

export default Sidebar;
