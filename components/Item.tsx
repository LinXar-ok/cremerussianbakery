"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/state/cartSlice";
import Link from "next/link";
import { AppDispatch } from "@/state/store";
import { CakeItem } from "@/types";
import Image from "next/image";

interface ItemProps {
  item: CakeItem;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSize, setSelectedSize] = useState<string>(
    item.attributes.sizes[0]
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    item.attributes.colors[0]
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        item: {
          id: item.id,
          name: item.name,
          price: item.attributes.price,
          size: selectedSize,
          color: selectedColor,
          count: 1,
        },
      })
    );
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
      <Link href={`/products/${item.id}`}>
        <div className="h-64 bg-gray-200 relative">
          {/* Replace with actual Image component */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <Image
              src={item.attributes.image.data[0].attributes.url}
              alt={item.name}
              width={500}
              height={500}
            />
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/products/${item.id}`}>
          <h3 className="text-xl font-bold mb-2 text-secondary hover:text-primary transition-colors">
            {item.name}
          </h3>
        </Link>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">Size:</p>
          <div className="flex space-x-2">
            {item.attributes.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedSize === size
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">Color:</p>
          <div className="flex space-x-2">
            {item.attributes.colors.map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedColor === color
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-secondary">
            ${item.attributes.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
