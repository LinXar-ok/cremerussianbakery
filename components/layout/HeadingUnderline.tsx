"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeadingUnderlineProps {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
  animate?: boolean;
}

export const HeadingUnderline: React.FC<HeadingUnderlineProps> = ({
  color = "#EF4444",
  // width = "w-24",
  height = "h-1",
  className = "",
  animate = true,
}) => {
  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "60vw" },
  };

  const dotsVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Left decorative dot */}
      <motion.div
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        variants={dotsVariants}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="w-2 h-2 rounded-full bg-current mr-2"
        style={{ color }}
      />

      {/* Main underline */}
      <motion.div
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        variants={underlineVariants}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`${height} rounded-full`}
        style={{ backgroundColor: color }}
      />

      {/* Right decorative dot */}
      <motion.div
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        variants={dotsVariants}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="w-2 h-2 rounded-full bg-current ml-2"
        style={{ color }}
      />
    </div>
  );
};

// Alternative: Swirl underline
export const SwirlUnderline: React.FC<HeadingUnderlineProps> = ({
  color = "#EF4444",
  className = "",
  animate = true,
}) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <svg
        width="120"
        height="12"
        viewBox="0 0 120 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-30 h-3"
      >
        <motion.path
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{
            pathLength: { duration: 1, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
          d="M0,6 C20,0 40,12 60,6 C80,0 100,12 120,6"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <motion.circle
          initial={animate ? { opacity: 0, scale: 0 } : undefined}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.3, delay: 0.8 }}
          cx="0"
          cy="6"
          r="2"
          fill={color}
        />
        <motion.circle
          initial={animate ? { opacity: 0, scale: 0 } : undefined}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.3, delay: 0.9 }}
          cx="120"
          cy="6"
          r="2"
          fill={color}
        />
      </svg>
    </div>
  );
};

// Alternative: Wavy underline
export const WavyUnderline: React.FC<HeadingUnderlineProps> = ({
  color = "#EF4444",
  className = "",
  animate = true,
}) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <svg
        width="100"
        height="14"
        viewBox="0 0 100 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-25 h-3.5"
      >
        <motion.path
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{
            pathLength: { duration: 0.8, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
          d="M0,7 Q25,0 50,7 T100,7"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <circle cx="0" cy="7" r="1.5" fill={color} />
        <circle cx="100" cy="7" r="1.5" fill={color} />
      </svg>
    </div>
  );
};

// Alternative: Heart underline (simpler version without motion)
export const HeartUnderline: React.FC<HeadingUnderlineProps> = ({
  color = "#EF4444",
  className = "",
}) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <svg
        width="80"
        height="20"
        viewBox="0 0 80 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-5"
      >
        <path
          d="M40,18 C30,10 20,5 20,5 C15,2 10,2 5,5 C0,8 0,15 5,18 C10,21 20,18 40,18 Z"
          fill={color}
          opacity="0.2"
        />
        <path
          d="M40,15 C30,10 20,5 20,5 C15,3 10,3 5,5 C0,7 0,12 5,15 C10,18 20,15 40,15 Z"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

// Additional cute underline types
export const DoubleUnderline: React.FC<HeadingUnderlineProps> = ({
  color = "#EF4444",
  className = "",
  animate = true,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        initial={animate ? { width: 0 } : undefined}
        animate={animate ? { width: "80%" } : undefined}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-24 h-1 rounded-full mb-1"
        style={{ backgroundColor: color }}
      />
      <motion.div
        initial={animate ? { width: 0 } : undefined}
        animate={animate ? { width: "60%" } : undefined}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        className="w-16 h-1 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export const DottedUnderline: React.FC<HeadingUnderlineProps> = ({
  color = "#EF4444",
  className = "",
  animate = true,
}) => {
  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, scale: 0 } : undefined}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.2, delay: i * 0.05 }}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export const GradientUnderline: React.FC<HeadingUnderlineProps> = ({
  color = "#EF4444",
  className = "",
  animate = true,
}) => {
  const gradientColors =
    color === "#EF4444"
      ? "from-pink-500 via-red-500 to-orange-500"
      : `from-${color}-400 via-${color}-500 to-${color}-600`;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        initial={animate ? { width: 0 } : undefined}
        animate={animate ? { width: "100%" } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-24 h-1.5 rounded-full bg-linear-to-r ${gradientColors}`}
      />
    </div>
  );
};
