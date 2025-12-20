"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/state/cartSlice";
import {
  FaStar,
  FaHeart,
  FaShare,
  FaTruck,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";
import { AppDispatch } from "@/state/store";
import Link from "next/link";

interface ProductDetailProps {
  productId: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  ingredients: string[];
  allergens: string[];
  sizes: { name: string; price: number }[];
  flavors: string[];
  decorations: string[];
  inStock: boolean;
}

const sampleProduct: Product = {
  id: "1",
  name: "Chocolate Fudge Cake",
  description: "Rich chocolate cake with fudge frosting",
  longDescription:
    "Our signature Chocolate Fudge Cake is made with premium cocoa and real Belgian chocolate. Each layer is soaked in chocolate syrup and frosted with our secret-recipe fudge frosting. Perfect for birthdays, celebrations, or any chocolate craving!",
  price: 15.99,
  originalPrice: 19.99,
  category: "Cakes",
  images: ["/cake1.jpg", "/cake2.jpg", "/cake3.jpg", "/cake4.jpg"],
  rating: 4.8,
  reviewCount: 127,
  ingredients: [
    "Flour",
    "Cocoa powder",
    "Sugar",
    "Eggs",
    "Butter",
    "Milk",
    "Belgian chocolate",
    "Heavy cream",
  ],
  allergens: ["Gluten", "Dairy", "Eggs"],
  sizes: [
    { name: "Small (6 servings)", price: 15.99 },
    { name: "Medium (12 servings)", price: 29.99 },
    { name: "Large (24 servings)", price: 54.99 },
  ],
  flavors: ["Chocolate", "Dark Chocolate", "Milk Chocolate"],
  decorations: [
    "Sprinkles",
    "Chocolate Shavings",
    "Fresh Berries",
    "Custom Message",
  ],
  inStock: true,
};

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    comment: "Best chocolate cake I've ever had! Will definitely order again.",
    helpful: 24,
  },
  {
    id: 2,
    name: "John D.",
    rating: 4,
    date: "2024-01-10",
    comment: "Great cake, arrived fresh and delicious.",
    helpful: 12,
  },
  {
    id: 3,
    name: "Emily R.",
    rating: 5,
    date: "2024-01-05",
    comment: "Perfect for my daughter's birthday. Everyone loved it!",
    helpful: 18,
  },
];

export default function ProductDetail({ productId }: ProductDetailProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(0);
  const [selectedDecoration, setSelectedDecoration] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = sampleProduct; // In real app, fetch by productId

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        item: {
          id: `${product.id}-${selectedSize}-${selectedFlavor}`,
          name: `${product.name} - ${product.sizes[selectedSize].name}`,
          price: product.sizes[selectedSize].price,
          size: product.sizes[selectedSize].name,
          color: product.flavors[selectedFlavor],
          count: quantity,
        },
      })
    );
  };

  const totalPrice = product.sizes[selectedSize].price * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products/${product.category.toLowerCase()}`}
          className="hover:text-primary"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${product.images[selectedImage]})`,
              }}
            />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </div>
            )}
            <button
              type="button"
              aria-label="addToFavorite"
              title="Add to favorites"
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaHeart
                className={`h-6 w-6 ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                type="button"
                title={` ${image} image #${index}`}
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-24 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label="share"
              title="Share product"
              className="p-3 hover:bg-gray-100 rounded-full"
            >
              <FaShare className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-primary">
                ${product.sizes[selectedSize].price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6 text-slate-700">
            <h3 className="text-lg font-bold mb-3">Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(index)}
                  title={`Select ${size.name}`}
                  className={`px-6 py-3 rounded-lg border-2 transition-all ${
                    selectedSize === index
                      ? "border-primary bg-red-50 text-primary-dark"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                >
                  <div className="font-semibold">{size.name}</div>
                  <div className="text-lg font-bold">
                    ${size.price.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Selection */}
          <div className="mb-6 text-slate-700">
            <h3 className="text-lg font-bold mb-3">Flavor</h3>
            <div className="flex flex-wrap gap-3">
              {product.flavors.map((flavor, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFlavor(index)}
                  title={`Select ${flavor} flavor`}
                  className={`px-6 py-3 rounded-lg border-2 transition-all ${
                    selectedFlavor === index
                      ? "border-primary bg-primary-100 text-primary-dark"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          {/* Decoration Selection */}
          <div className="mb-6 text-slate-700">
            <h3 className="text-lg font-bold mb-3">Decoration</h3>
            <div className="flex flex-wrap gap-3">
              {product.decorations.map((decoration, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDecoration(index)}
                  title={`Select ${decoration} decoration`}
                  className={`px-6 py-2 rounded-lg border transition-all ${
                    selectedDecoration === index
                      ? "border-primary bg-primary-100 text-primary-dark"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                >
                  {decoration}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mb-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border text-ptext rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  title="Decrease quantity"
                  className="px-4 py-3 text-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-3 text-lg font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  title="Increase quantity"
                  className="px-4 py-3 text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="flex-1">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                    product.inStock
                      ? "bg-primary hover:bg-primary-dark text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inStock
                    ? `Add to Cart - $${totalPrice.toFixed(2)}`
                    : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-indigo-300">
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <FaTruck className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Free Shipping</p>
              <p className="text-xs text-gray-600">Over $50</p>
            </div>
            <div className="text-center p-4 bg-indigo-50  rounded-lg">
              <FaShieldAlt className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Quality Guarantee</p>
              <p className="text-xs text-gray-600">100% Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-indigo-50  rounded-lg">
              <FaLeaf className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Fresh Ingredients</p>
              <p className="text-xs text-gray-600">Daily Baked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b">
          <div className="flex space-x-8">
            <button className="py-4 border-b-2 border-primary text-primary font-semibold">
              Description
            </button>
            <button className="py-4 text-gray-600 hover:text-primary font-semibold">
              Ingredients
            </button>
            <button className="py-4 text-gray-600 hover:text-primary font-semibold">
              Reviews ({product.reviewCount})
            </button>
            <button className="py-4 text-gray-600 hover:text-primary font-semibold">
              Shipping Info
            </button>
          </div>
        </div>

        <div className="py-8">
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold mb-4 text-slate-700">
              About This Cake
            </h3>
            <p className="text-gray-600 mb-6">{product.longDescription}</p>

            <h4 className="text-xl font-bold mb-3 text-slate-700">
              Key Features:
            </h4>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Made with premium Belgian chocolate</li>
              <li>Moist and rich chocolate sponge</li>
              <li>Creamy fudge frosting</li>
              <li>Customizable decorations</li>
              <li>Perfect for celebrations</li>
            </ul>

            <h4 className="text-xl font-bold mb-3 text-slate-700">
              Ingredients:
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>

            <h4 className="text-xl font-bold mb-3 text-slate-700">
              Allergens:
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.allergens.map((allergen, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
