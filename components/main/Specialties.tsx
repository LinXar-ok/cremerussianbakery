"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaBirthdayCake,
  FaCookieBite,
  FaBreadSlice,
  FaMugHot,
} from "react-icons/fa";
import { HeadingUnderline } from "../layout/HeadingUnderline";
import { SectionHeading } from "../layout/SectionHeading";

const Specialties = () => {
  const specialties = [
    {
      icon: <FaBirthdayCake className="h-12 w-12" />,
      title: "Custom Cakes",
      description: "Personalized birthday, wedding, and celebration cakes",
    },
    {
      icon: <FaCookieBite className="h-12 w-12" />,
      title: "Artisan Cookies",
      description: "Hand-decorated cookies for every occasion",
    },
    {
      icon: <FaBreadSlice className="h-12 w-12" />,
      title: "Fresh Breads",
      description: "Daily baked artisan breads and pastries",
    },
    {
      icon: <FaMugHot className="h-12 w-12" />,
      title: "Coffee Pairings",
      description: "Perfect coffee blends to complement our pastries",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Our Specialties"
          subtitle="We specialize in creating unforgettable experiences through our delicious baked goods"
          underlineType="default"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg bg-gray-50 hover:bg-primary-100 transition-colors"
            >
              <div className="text-primary-dark mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-secondary">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specialties;
