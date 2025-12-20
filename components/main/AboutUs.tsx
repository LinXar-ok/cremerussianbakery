"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../layout/SectionHeading";

const AboutUs = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title="Our Story"
              underlineType="heart"
              align="left"
            />
            <p className="text-gray-600 mb-4">
              Founded in 2015 by Master Baker Maria Richardson, Crème Russian
              Bakery began as a small home kitchen with a big dream. What
              started with family recipes passed down through generations has
              grown into a beloved local bakery.
            </p>
            <p className="text-gray-600 mb-6">
              Today, we continue to use traditional baking methods combined with
              modern techniques to create exceptional cakes, pastries, and
              breads. Every item is made with the finest ingredients and a whole
              lot of love.
            </p>
            <Link
              href="/about"
              className="inline-block border-2 border-secondary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary hover:text-white transition-colors"
            >
              Learn More About Us
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-100 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary-100 animate-pulse" />
            {/* Replace with actual Image component */}
            {/* <Image src="/about-us.jpg" alt="Our bakery" fill className="object-cover" /> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
