"use client";

import React, { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  title: string | ReactNode;
  subtitle: string | ReactNode;
  background?: "gradient" | "image" | "video" | "pattern";
  backgroundImage?: string;
  backgroundVideo?: string;
  pattern?: "cakes" | "flowers" | "sprinkles" | "geometric";
  gradient?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  ctaButtons?: {
    primary?: {
      text: string;
      href: string;
      icon?: ReactNode;
    };
    secondary?: {
      text: string;
      href: string;
      icon?: ReactNode;
    };
  };
  floatingElements?: boolean;
  sparkleEffects?: boolean;
  align?: "left" | "center" | "right";
  height?: "small" | "medium" | "large" | "full";
  textColor?: "light" | "dark";
  className?: string;
}

// Helper function for stable random values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function HeroSection({
  title,
  subtitle,
  background = "gradient",
  backgroundImage = "/hero-background.jpg",
  backgroundVideo,
  pattern = "cakes",
  gradient = "from-pink-500 via-rose-500 to-orange-400",
  overlay = true,
  overlayOpacity = 0.3,
  ctaButtons,
  floatingElements = true,
  sparkleEffects = true,
  align = "center",
  height = "medium",
  textColor = "light",
  className = "",
}: HeroSectionProps) {
  // Height classes
  const heightClasses = {
    small: "h-[60vh] min-h-[400px]",
    medium: "h-[70vh] min-h-[500px]",
    large: "h-[85vh] min-h-[600px]",
    full: "h-screen min-h-[700px]",
  };

  // Alignment classes
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  // Text color classes
  const textColorClasses = {
    light: "text-white",
    dark: "text-gray-900",
  };

  // Pattern backgrounds
  const patternClasses = {
    cakes: "bg-cake-pattern",
    flowers: "bg-flower-pattern",
    sprinkles: "bg-sprinkle-pattern",
    geometric: "bg-geometric-pattern",
  };

  // Fixed Framer Motion variants - CORRECTED
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Fixed: Using the correct Framer Motion Variants type
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const, // Type assertion to fix the error
        stiffness: 100,
        damping: 10,
        mass: 1,
      },
    },
  };

  // Decorative floating elements
  const floatingElementsData = [
    { emoji: "🎂", size: "text-4xl", delay: 0, duration: 8 },
    { emoji: "🧁", size: "text-3xl", delay: 1, duration: 7 },
    { emoji: "🍰", size: "text-5xl", delay: 2, duration: 9 },
    { emoji: "✨", size: "text-2xl", delay: 0.5, duration: 6 },
    { emoji: "🌟", size: "text-3xl", delay: 1.5, duration: 8 },
    { emoji: "🎨", size: "text-4xl", delay: 0.8, duration: 7 },
  ];

  // Generate stable random positions for sparkles - FIXED React purity error
  const sparklePositions = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => {
        const seed = i * 0.1;
        return {
          id: i,
          left: seededRandom(seed) * 100,
          top: seededRandom(seed + 1) * 100,
        };
      }),
    []
  );

  return (
    <section
      className={`relative overflow-hidden ${heightClasses[height]} ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {background === "gradient" && (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}

        {background === "image" && backgroundImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            {overlay && (
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
          </>
        )}

        {background === "video" && backgroundVideo && (
          <>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            {overlay && (
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
          </>
        )}

        {background === "pattern" && (
          <div
            className={`absolute inset-0 ${patternClasses[pattern]} opacity-10`}
          />
        )}
      </div>

      {/* Animated floating elements */}
      {floatingElements && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingElementsData.map((element, index) => (
            <motion.div
              key={index}
              className={`absolute ${element.size} opacity-20`}
              initial={{ y: 0, rotate: 0 }}
              animate={{
                y: [0, -100, 0],
                rotate: [0, 180, 360],
                x: [0, 50, 0],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay,
              }}
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 3) * 20}%`,
              }}
            >
              {element.emoji}
            </motion.div>
          ))}
        </div>
      )}

      {/* Sparkle effects */}
      {sparkleEffects && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {sparklePositions.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: sparkle.id * 0.2,
              }}
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`max-w-6xl mx-auto w-full flex flex-col ${alignClasses[align]} ${textColorClasses[textColor]}`}
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              {typeof title === "string" ? (
                <span className="relative inline-block">
                  {title}
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/50 rounded-full"></span>
                </span>
              ) : (
                title
              )}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            variants={itemVariants}
            className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto" : ""}`}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-light opacity-90">
              {subtitle}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          {ctaButtons && (
            <motion.div
              variants={itemVariants}
              className={`flex flex-wrap gap-4 ${
                align === "center"
                  ? "justify-center"
                  : align === "right"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {ctaButtons.primary && (
                <Link
                  href={ctaButtons.primary.href}
                  className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {ctaButtons.primary.icon}
                    {ctaButtons.primary.text}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              )}

              {ctaButtons.secondary && (
                <Link
                  href={ctaButtons.secondary.href}
                  className="group px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    {ctaButtons.secondary.icon}
                    {ctaButtons.secondary.text}
                  </span>
                </Link>
              )}
            </motion.div>
          )}

          {/* Scroll indicator */}
          {height !== "small" && (
            <motion.div
              variants={itemVariants}
              className={`absolute bottom-8 ${
                align === "center"
                  ? "left-1/2 transform -translate-x-1/2"
                  : align === "right"
                  ? "right-8"
                  : "left-8"
              }`}
            >
              <div className="animate-bounce flex flex-col items-center">
                <span className="text-sm mb-2 opacity-80">Scroll down</span>
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                  <motion.div
                    className="w-1 h-3 bg-white rounded-full mt-2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="white"
            fillOpacity="0.1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
