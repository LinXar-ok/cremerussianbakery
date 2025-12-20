"use client";

import React, { useState } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import { useFilters } from "./ProductFilterContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "Chocolate Fudge Cake",
    description: "Rich chocolate cake with fudge frosting",
    price: 15.99,
    category: "Cakes",
    image: "/cake1.jpg",
    rating: 4.8,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting",
    price: 16.99,
    category: "Cakes",
    image: "/cake2.jpg",
    rating: 4.9,
    isNew: true,
  },
  {
    id: "3",
    name: "Vanilla Dream Cake",
    description: "Light vanilla sponge with buttercream frosting",
    price: 14.99,
    category: "Cakes",
    image: "/cake3.jpg",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Carrot Walnut Cake",
    description: "Moist carrot cake with walnuts and cream cheese frosting",
    price: 17.99,
    category: "Cakes",
    image: "/cake4.jpg",
    rating: 4.9,
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Croissant",
    description: "Buttery French croissant",
    price: 3.99,
    category: "Pastries",
    image: "/pastry1.jpg",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Chocolate Eclair",
    description: "Cream-filled pastry with chocolate glaze",
    price: 4.99,
    category: "Pastries",
    image: "/pastry2.jpg",
    rating: 4.8,
  },
  {
    id: "7",
    name: "Apple Turnover",
    description: "Flaky pastry filled with spiced apples",
    price: 4.49,
    category: "Pastries",
    image: "/pastry3.jpg",
    rating: 4.7,
  },
  {
    id: "8",
    name: "Macarons (6 pack)",
    description: "Assorted French macarons",
    price: 12.99,
    category: "Pastries",
    image: "/pastry4.jpg",
    rating: 4.9,
    isNew: true,
  },
  {
    id: "9",
    name: "Sourdough Bread",
    description: "Artisan sourdough loaf",
    price: 8.99,
    category: "Breads",
    image: "/bread1.jpg",
    rating: 4.8,
  },
  {
    id: "10",
    name: "Baguette",
    description: "Traditional French baguette",
    price: 5.99,
    category: "Breads",
    image: "/bread2.jpg",
    rating: 4.7,
  },
  {
    id: "11",
    name: "Chocolate Chip Cookies (6)",
    description: "Chewy chocolate chip cookies",
    price: 6.99,
    category: "Cookies",
    image: "/cookie1.jpg",
    rating: 4.8,
  },
  {
    id: "12",
    name: "Sugar Cookies (12)",
    description: "Decorated sugar cookies",
    price: 9.99,
    category: "Cookies",
    image: "/cookie2.jpg",
    rating: 4.6,
  },
];
const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A-Z" },
];

export default function ProductGrid() {
  const [sortBy, setSortBy] = useState("default");
  const { filters, resetFilters } = useFilters();

  // Apply filters from the ProductFilters component
  const filteredProducts = products.filter((product) => {
    // Advanced category filters (multiple selection)
    if (filters.categories.length > 0) {
      const categoryMatch = filters.categories.some((cat) => {
        if (cat === "cakes") return product.category === "Cakes";
        if (cat === "pastries") return product.category === "Pastries";
        if (cat === "breads") return product.category === "Breads";
        if (cat === "cookies") return product.category === "Cookies";
        if (cat === "cupcakes") return product.category === "Cupcakes";
        if (cat === "desserts") return product.category === "Desserts";
        return false;
      });
      if (!categoryMatch) return false;
    }

    // Price range filter
    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Rating filter
    if (product.rating < filters.minRating) {
      return false;
    }

    // Features filters
    if (filters.features.newArrivals && !product.isNew) return false;
    if (filters.features.bestSellers && !product.isBestSeller) return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Helper function to count products by category for display
  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <div>
      {/* Mobile filter toggle - now just shows the ProductFilters sidebar */}
      <div className="lg:hidden flex items-center justify-between mb-6">
        <button
          onClick={() => {
            const sidebar = document.querySelector("aside");
            if (sidebar) {
              sidebar.classList.toggle("hidden");
            }
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          <FaFilter />
          <span>Filters</span>
        </button>
        <div className="flex items-center space-x-2">
          <FaSort className="text-gray-600" />
          <select
            aria-label="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product grid header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
          {/* Active filters summary */}
          {(filters.categories.length > 0 ||
            filters.minRating > 0 ||
            filters.priceRange[0] > 0 ||
            filters.priceRange[1] < 100 ||
            Object.values(filters.features).some(Boolean)) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.categories.length > 0 && (
                <span className="text-sm text-gray-600">
                  Categories: {filters.categories.length} selected
                </span>
              )}
              {filters.minRating > 0 && (
                <span className="text-sm text-gray-600">
                  Rating: {filters.minRating}+
                </span>
              )}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                <span className="text-sm text-gray-600">
                  Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 hidden lg:inline">Sort by:</span>
          <select
            aria-label="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border outline-primary-500 rounded-lg px-3 py-2 text-gray-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No products found</p>
          <button
            onClick={resetFilters}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundColor: "#f3f4f6",
                  }}
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      NEW
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      BEST SELLER
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center">
                  <span className="text-yellow-500 font-bold">★</span>
                  <span className="ml-1 font-semibold text-primary">
                    {product.rating}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {product.category} ({categoryCounts[product.category] || 0})
                  </span>
                  <a
                    href={`/products/${product.id}`}
                    className="bg-secondary hover:bg-primary text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 text-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex justify-center text-gray-400">
        <div className="flex space-x-2 ">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 hover:text-ptext">
            Previous
          </button>
          <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:text-ptext">
            1
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 hover:text-ptext">
            2
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 hover:text-ptext">
            3
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 hover:text-ptext">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
