"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaSeedling,
  FaUsers,
  FaAward,
  FaHandsHelping,
  FaRecycle,
} from "react-icons/fa";

interface Value {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const values: Value[] = [
  {
    id: 1,
    icon: <FaHeart className="h-8 w-8" />,
    title: "Made with Love",
    description:
      "Every pastry is crafted with care and attention to detail, just like we'd make for our own family.",
    color: "bg-red-50 border-red-200",
  },
  {
    id: 2,
    icon: <FaSeedling className="h-8 w-8" />,
    title: "Quality Ingredients",
    description:
      "We source only the finest, freshest ingredients from local suppliers whenever possible.",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 3,
    icon: <FaUsers className="h-8 w-8" />,
    title: "Community Focused",
    description:
      "We believe in giving back to our community and supporting local events and charities.",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 4,
    icon: <FaAward className="h-8 w-8" />,
    title: "Artisan Excellence",
    description:
      "Our bakers are trained in traditional techniques while embracing modern innovation.",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: 5,
    icon: <FaHandsHelping className="h-8 w-8" />,
    title: "Personalized Service",
    description:
      "We work closely with each customer to create exactly what they envision for their special occasion.",
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: 6,
    icon: <FaRecycle className="h-8 w-8" />,
    title: "Sustainable Practices",
    description:
      "We're committed to reducing waste and using eco-friendly packaging materials.",
    color: "bg-teal-50 border-teal-200",
  },
];

const commitments = [
  "100% Satisfaction Guarantee",
  "Freshly Baked Daily",
  "No Artificial Preservatives",
  "Custom Orders Welcome",
  "Local Delivery Available",
  "Gluten-Free & Vegan Options",
];

export default function ValuesSection() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            These principles guide everything we do, from selecting ingredients
            to serving our customers.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border-2 ${value.color} hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`p-3 rounded-full ${
                      value.color
                        .split(" ")[0]
                        .replace("bg-", "bg-")
                        ?.replace("-50", "-100") || "bg-gray-100"
                    }`}
                  >
                    {value.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Commitment Section */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Commitment to You
              </h3>
              <p className="text-gray-600 mb-8">
                We promise to always provide the highest quality baked goods
                with exceptional service. Your satisfaction is our top priority,
                and we&apos;re dedicated to making every experience with Crème
                Russian Bakery a sweet one.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">
                      {commitment}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <FaHeart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Quality Promise
                    </h4>
                    <p className="text-gray-600">Since 2015</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Fresh Ingredients</span>
                    <span className="font-bold text-green-600">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Customer Satisfaction</span>
                    <span className="font-bold text-green-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Repeat Customers</span>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Local Ingredients</span>
                    <span className="font-bold text-green-600">70%</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    *Based on 2023 customer feedback and internal quality
                    metrics
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-red-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-pink-200 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>

        {/* Heritage Section */}
        <div className="mt-20 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            A Family Tradition
          </h4>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our recipes have been passed down through generations, each one
            perfected over time. From Maria&apos;s grandmother&apos;s kitchen to
            our modern bakery, we honor tradition while embracing innovation to
            bring you the very best in baked goods.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="bg-red-100 text-primary-dark px-4 py-2 rounded-full">
              Family Recipes
            </span>
            <span className="bg-red-100 text-primary-dark px-4 py-2 rounded-full">
              Handcrafted Daily
            </span>
            <span className="bg-red-100 text-primary-dark px-4 py-2 rounded-full">
              Community Love
            </span>
            <span className="bg-red-100 text-primary-dark px-4 py-2 rounded-full">
              Award Winning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
