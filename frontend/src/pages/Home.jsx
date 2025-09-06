import React, { useState } from "react";
import { Container, PostCard, Sidebar, Newsletter } from "../components";

const products = [
  {
    id: 1,
    title: "Sony WH-1000XM4 Wireless Headphones",
    price: 348,
    originalPrice: 400,
    rating: 4.5,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    badge: "SALE",
    category: "Audio"
  },
  {
    id: 2,
    title: "Microsoft Xbox Controller",
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviews: 856,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop",
    badge: "SALE",
    category: "Gaming"
  },
  {
    id: 3,
    title: "Razer Gaming Keyboard",
    price: 129.99,
    rating: 4.3,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
    badge: "NEW",
    category: "Gaming"
  },
  {
    id: 4,
    title: "Logitech Web Camera",
    price: 89.99,
    rating: 4.2,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
    badge: "SALE",
    category: "Accessories"
  },
  {
    id: 5,
    title: "Logitech 2.1 Speaker System",
    price: 149.99,
    rating: 4.4,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    badge: "SALE",
    category: "Audio"
  },
  {
    id: 6,
    title: "Amazon Echo Smart Speaker",
    price: 99.99,
    rating: 4.6,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop",
    badge: "SALE",
    category: "Smart Home"
  },
  {
    id: 7,
    title: "Logitech Vertical Mouse",
    price: 69.99,
    rating: 4.1,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    badge: "SALE",
    category: "Accessories"
  },
  {
    id: 8,
    title: "Xbox Wireless Controller White",
    price: 59.99,
    rating: 4.8,
    reviews: 672,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop",
    badge: "SALE",
    category: "Gaming"
  },
  {
    id: 9,
    title: "Logitech Gaming Headset",
    price: 79.99,
    rating: 4.3,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop",
    badge: "SALE",
    category: "Gaming"
  }
];

const categories = ["All", "Audio", "Gaming", "Accessories", "Smart Home"];
const brands = ["All", "Sony", "Microsoft", "Razer", "Logitech", "Amazon"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200+", min: 200, max: Infinity }
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const brandMatch = selectedBrand === "All" || product.title.toLowerCase().includes(selectedBrand.toLowerCase());
    const priceMatch = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    return categoryMatch && brandMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-8 bg-[#F8F9FA]">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore All Products</h1>
            <p className="text-gray-600">Discover our latest collection of tech products</p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Component */}
            <Sidebar
              categories={categories}
              brands={brands}
              priceRanges={priceRanges}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedPriceRange={selectedPriceRange}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrand}
              onPriceRangeChange={setSelectedPriceRange}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort and Results */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{sortedProducts.length} products found</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="featured">Sort by Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Products Grid using PostCard component */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {sortedProducts.map((product) => (
                  <PostCard key={product.id} {...product} />
                ))}
              </div>

              {/* Newsletter Component */}
              <Newsletter />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
