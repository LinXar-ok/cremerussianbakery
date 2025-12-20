"use client";

import React from "react";
import Item from "./Item";
import { Product } from "@/types";
import { SectionHeading } from "./layout/SectionHeading";

const items: Product[] = [
  {
    id: "cake001",
    name: "Chocolate Fudge Cake",
    attributes: {
      sizes: ["Small", "Medium", "Large"],
      colors: ["Brown", "White"],
      price: 15.99,
      image: {
        data: [
          {
            attributes: {
              url: "/pexels-AllOcca.jpg",
              formats: {
                thumbnail: { url: "/pexels-AllOcca.jpg" },
                small: { url: "/pexels-AllOcca.jpg" },
                medium: { url: "/pexels-AllOcca.jpg" },
              },
            },
          },
        ],
      },
    },
  },
  {
    id: "cake002",
    name: "Chocolate Fudge Cake",
    attributes: {
      sizes: ["Small", "Medium", "Large"],
      colors: ["Brown", "White"],
      price: 15.99,
      image: {
        data: [
          {
            attributes: {
              url: "/pexels-AllOcca.jpg",
              formats: {
                thumbnail: { url: "/pexels-AllOcca.jpg" },
                small: { url: "/pexels-AllOcca.jpg" },
                medium: { url: "/pexels-AllOcca.jpg" },
              },
            },
          },
        ],
      },
    },
  },
  {
    id: "cake003",
    name: "Red Velvet Cake",
    attributes: {
      sizes: ["Small", "Medium", "Large"],
      colors: ["Red", "Cream"],
      price: 16.99,
      image: {
        data: [
          {
            attributes: {
              url: "/pexels-AllOcca.jpg",
              formats: {
                thumbnail: { url: "/pexels-AllOcca.jpg" },
                small: { url: "/pexels-AllOcca.jpg" },
                medium: { url: "/pexels-AllOcca.jpg" },
              },
            },
          },
        ],
      },
    },
  },
  {
    id: "cake004",
    name: "Red Velvet Cake",
    attributes: {
      sizes: ["Small", "Medium", "Large"],
      colors: ["Red", "Cream"],
      price: 16.99,
      image: {
        data: [
          {
            attributes: {
              url: "/pexels-AllOcca.jpg",
              formats: {
                thumbnail: { url: "/pexels-AllOcca.jpg" },
                small: { url: "/pexels-AllOcca.jpg" },
                medium: { url: "/pexels-AllOcca.jpg" },
              },
            },
          },
        ],
      },
    },
  },
];

const CakeShop = () => {
  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto py-20">
        <SectionHeading title="Shop Our Pastries" underlineType="swirl" />
        <div className="mx-auto mt-14 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-around gap-y-5 gap-x-[1.33%] max-h-screen overflow-auto">
          {items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CakeShop;
