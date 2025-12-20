import React, { ReactNode } from "react";

interface AnimatedHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  emoji?: string;
  gradient?: "pink" | "purple" | "orange" | "blue" | "green";
  align?: "left" | "center" | "right";
}

export function AnimatedHeading({
  title,
  subtitle,
  titleClassName = "",
  subtitleClassName = "",
  emoji = "✨",
  gradient = "pink",
  align = "center",
}: AnimatedHeadingProps) {
  const gradients = {
    pink: "from-pink-600 via-rose-600 to-amber-600",
    purple: "from-purple-600 via-pink-600 to-blue-600",
    orange: "from-orange-600 via-amber-600 to-yellow-600",
    blue: "from-blue-600 via-cyan-600 to-teal-600",
    green: "from-emerald-600 via-green-600 to-lime-600",
  };

  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`relative ${alignments[align]} mb-12`}>
      {/* Decorative background */}
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-pink-300/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-amber-300/10 rounded-full blur-3xl"></div>

      {/* Title */}
      <h1 className={`relative ${titleClassName}`}>
        <span
          className={`bg-gradient-to-r ${gradients[gradient]} bg-clip-text text-transparent`}
        >
          {title}
        </span>
        <div className="absolute -top-2 -right-4 text-3xl animate-bounce">
          {emoji}
        </div>
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`relative inline-block max-w-3xl mx-auto mt-6 ${subtitleClassName}`}
        >
          <span className="relative">
            {subtitle}
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-400/20 to-amber-400/20 rounded-full"></div>
          </span>
        </p>
      )}
    </div>
  );
}
