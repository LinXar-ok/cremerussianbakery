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
              url: "/cake_04.jpg",
              formats: {
                thumbnail: { url: "/cake_01.jpg" },
                small: { url: "/cake_01.jpg" },
                medium: { url: "/cake_01.jpg" },
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
              url: "/cake_02.jpg",
              formats: {
                thumbnail: { url: "/cake_02.jpg" },
                small: { url: "/cake_02.jpg" },
                medium: { url: "/cake_02.jpg" },
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
              url: "/cake_03.jpg",
              formats: {
                thumbnail: { url: "/cake_03.jpg" },
                small: { url: "/cake_03.jpg" },
                medium: { url: "/cake_03.jpg" },
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
              url: "/cake_05.jpg",
              formats: {
                thumbnail: { url: "/cake_04.jpg" },
                small: { url: "/cake_04.jpg" },
                medium: { url: "/cake_04.jpg" },
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
    <div className="bg-primary-200">
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
