"use client";

import { FaDollarSign, FaStar } from "react-icons/fa";
import { useFilters } from "@/components/products/ProductFilterContext";

export default function ProductFilters() {
  const { filters, setFilters, resetFilters } = useFilters();

  const categories = [
    { id: "cakes", label: "Cakes", count: 12 },
    { id: "pastries", label: "Pastries", count: 8 },
    { id: "breads", label: "Breads", count: 6 },
    { id: "cookies", label: "Cookies", count: 10 },
    { id: "cupcakes", label: "Cupcakes", count: 6 },
    { id: "desserts", label: "Desserts", count: 4 },
  ];

  const handleCategoryChange = (categoryId: string) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories };
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }));
  };

  const handleFeatureChange = (feature: keyof typeof filters.features) => {
    setFilters((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-primary">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="h-4 w-4 text-red-600 rounded focus:ring-red-500"
                />
                <span className="text-gray-700">{category.label}</span>
              </div>
              <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                {category.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center text-primary">
          <FaDollarSign className="mr-2" />
          Price Range
        </h3>
        <div className="px-2">
          <input
            aria-label="range"
            type="range"
            min="0"
            max="100"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handlePriceChange(filters.priceRange[0], parseInt(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">${filters.priceRange[0]}</span>
            <span className="text-gray-600">${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center text-primary">
          <FaStar className="mr-2" />
          Minimum Rating
        </h3>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                setFilters((prev) => ({ ...prev, minRating: rating }))
              }
              className={`flex-1 py-2 text-center rounded-lg ${
                filters.minRating === rating
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {rating}+ ★
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-bold text-primary mb-4">Features</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.features.newArrivals}
              onChange={() => handleFeatureChange("newArrivals")}
              className="h-4 w-4 text-primary-dark rounded focus:ring-primary-dark"
            />
            <span className="ml-3 text-gray-700">New Arrivals</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.features.bestSellers}
              onChange={() => handleFeatureChange("bestSellers")}
              className="h-4 w-4 text-primary-dark rounded focus:ring-red-500"
            />
            <span className="ml-3 text-gray-700">Best Sellers</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.features.glutenFree}
              onChange={() => handleFeatureChange("glutenFree")}
              className="h-4 w-4 text-primary-dark rounded focus:ring-red-500"
            />
            <span className="ml-3 text-gray-700">Gluten Free</span>
          </label>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full py-3 border-2 border-primary-dark text-primary-dark rounded-lg font-semibold hover:bg-primary-100 transition-colors cursor-pointer"
      >
        Reset All Filters
      </button>

      {/* Selected Filters */}
      {(filters.categories.length > 0 ||
        filters.minRating > 0 ||
        Object.values(filters.features).some(Boolean)) && (
        <div className="pt-6 border-t">
          <h4 className="font-bold mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((cat) => (
              <span
                key={cat}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
              >
                {categories.find((c) => c.id === cat)?.label}
              </span>
            ))}
            {filters.minRating > 0 && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                Rating: {filters.minRating}+
              </span>
            )}
            {Object.entries(filters.features)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <span
                  key={key}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
