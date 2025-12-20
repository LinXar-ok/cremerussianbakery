"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ImagesSlider } from "../ImagesSlider";

export const Hero = () => {
  const images = ["/cake_1.png", "/cake_2.png", "/cake_3.png"];

  return (
    <div className="h-[60vh] md:h-[80vh] relative">
      <ImagesSlider
        images={images}
        className="h-full"
        overlayClassName="bg-gradient-to-t from-black/60 to-transparent"
      >
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-50 text-center text-white px-4"
        >
          <motion.h1 className="text-4xl md:text-7xl font-roaster mb-6">
            Crème Russian Bakery
          </motion.h1>
          <motion.p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
            Handcrafted with love since 2015. Fresh, delicious pastries made
            daily.
          </motion.p>
          <Link
            href="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Order Now
          </Link>
        </motion.div>
      </ImagesSlider>
    </div>
  );
};
