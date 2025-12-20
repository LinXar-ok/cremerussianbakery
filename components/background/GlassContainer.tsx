import React, { ReactNode } from "react";

interface GlassContainerProps {
  children: ReactNode;
  intensity?: "light" | "medium" | "heavy";
  className?: string;
  blur?: boolean;
}

export function GlassContainer({
  children,
  intensity = "medium",
  className = "",
  blur = true,
}: GlassContainerProps) {
  const intensities = {
    light: "bg-white/70 backdrop-blur-sm",
    medium: "bg-white/80 backdrop-blur-md",
    heavy: "bg-white/90 backdrop-blur-lg",
  };

  return (
    <div className={`relative ${className}`}>
      {/* Decorative background blur */}
      {intensity === "heavy" && (
        <div className="absolute -inset-4 bg-linear-to-r from-pink-400/5 via-rose-400/5 to-amber-400/5 rounded-3xl blur-xl"></div>
      )}

      {/* Glass container */}
      <div
        className={`relative ${
          intensities[intensity]
        } rounded-3xl shadow-2xl overflow-hidden border border-white/20 ${
          blur ? "backdrop-blur-lg" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
