"use client";

import React, { ReactNode, useMemo } from "react";

interface MagicalBackgroundProps {
  children: ReactNode;
  theme?: "cake" | "bakery" | "celebration" | "elegant";
  intensity?: "light" | "medium" | "strong";
  floatingElements?: boolean;
  sparkles?: boolean;
  gradientColors?: {
    from: string;
    via: string;
    to: string;
  };
  className?: string;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function MagicalBackground({
  children,
  theme = "cake",
  intensity = "medium",
  floatingElements = true,
  sparkles = true,
  gradientColors,
  className = "",
}: MagicalBackgroundProps) {
  // Theme-based color presets
  const themes = useMemo(
    () => ({
      cake: {
        gradient: "from-secondary via-pink-50 to-amber-50",
        icons: ["🎂", "🧁", "🍰", "🎨", "✨", "🌟"],
        iconColor: "text-pink-200/30",
        sprinkleColors: ["#FFB6C1", "#FFD700", "#98FB98", "#87CEEB", "#DDA0DD"],
      },
      bakery: {
        gradient: "from-primary-100 via-orange-50 to-secondary",
        icons: ["🍞", "🥐", "🥨", "🥖", "🍪", "🥧"],
        iconColor: "text-amber-200/30",
        sprinkleColors: ["#FFA500", "#FFD700", "#FF6B35", "#FFB347", "#FFE5B4"],
      },
      celebration: {
        gradient: "from-purple-50 via-pink-50 to-blue-50",
        icons: ["🎉", "🎊", "🎁", "🎈", "🥳", "✨"],
        iconColor: "text-purple-200/30",
        sprinkleColors: ["#9B5DE5", "#F15BB5", "#00BBF9", "#00F5D4", "#FFD166"],
      },
      elegant: {
        gradient: "from-slate-50 via-primary-300 to-zinc-50",
        icons: ["👑", "💎", "✨", "🌟", "🎀", "🕯️"],
        iconColor: "text-slate-200/30",
        sprinkleColors: ["#C0C0C0", "#D4AF37", "#A8A8A8", "#D3D3D3", "#F5F5F5"],
      },
    }),
    []
  );

  // Intensity presets
  const intensities = useMemo(
    () => ({
      light: {
        iconOpacity: "opacity-20",
        sprinkleOpacity: "opacity-20",
        sparkleOpacity: "opacity-10",
      },
      medium: {
        iconOpacity: "opacity-30",
        sprinkleOpacity: "opacity-30",
        sparkleOpacity: "opacity-15",
      },
      strong: {
        iconOpacity: "opacity-40",
        sprinkleOpacity: "opacity-40",
        sparkleOpacity: "opacity-20",
      },
    }),
    []
  );

  // Generate stable random values for positions
  const floatingIconsData = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => {
        // Use index as seed for stable random values
        const seed = i * 0.1;
        return {
          id: i,
          left: seededRandom(seed) * 100,
          top: seededRandom(seed + 1) * 100,
          fontSize: 20 + seededRandom(seed + 2) * 40,
          rotation: seededRandom(seed + 3) * 360,
          animationDuration: 6 + seededRandom(seed + 4) * 6,
          iconIndex: Math.floor(
            seededRandom(seed + 5) * themes[theme].icons.length
          ),
        };
      }),
    [theme, themes]
  );

  const sprinklesData = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const seed = i * 0.1;
        return {
          id: i,
          left: seededRandom(seed) * 100,
          top: seededRandom(seed + 1) * 100,
          width: 2 + seededRandom(seed + 2) * 3,
          height: 2 + seededRandom(seed + 3) * 3,
          colorIndex: Math.floor(
            seededRandom(seed + 4) * themes[theme].sprinkleColors.length
          ),
          rotation: seededRandom(seed + 5) * 360,
          animationDuration: 2 + seededRandom(seed + 6) * 3,
        };
      }),
    [theme, themes]
  );

  const sparklesData = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const seed = i * 0.1;
        return {
          id: i,
          left: 10 + i * 12,
          top: 10 + seededRandom(seed) * 80,
          animationDuration: 3 + i,
        };
      }),
    []
  );

  const currentTheme = themes[theme];
  const currentIntensity = intensities[intensity];
  const gradient = gradientColors
    ? `from-[${gradientColors.from}] via-[${gradientColors.via}] to-[${gradientColors.to}]`
    : currentTheme.gradient;

  // Get opacity value as number
  const getOpacityValue = (opacityClass: string) => {
    return parseFloat(opacityClass.replace("opacity-", "")) / 100;
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-linear-to-br ${gradient}`}></div>

      {/* Animated floating decorations */}
      {floatingElements && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating icons */}
          {floatingIconsData.map((icon) => (
            <div
              key={`icon-${icon.id}`}
              className={`absolute ${currentTheme.iconColor} ${currentIntensity.iconOpacity}`}
              style={{
                animation: `float ${icon.animationDuration}s ease-in-out infinite`,
                animationDelay: `${icon.id * 0.5}s`,
                left: `${icon.left}%`,
                top: `${icon.top}%`,
                fontSize: `${icon.fontSize}px`,
                transform: `rotate(${icon.rotation}deg)`,
              }}
            >
              {currentTheme.icons[icon.iconIndex]}
            </div>
          ))}

          {/* Decorative sprinkles */}
          {sprinklesData.map((sprinkle) => (
            <div
              key={`sprinkle-${sprinkle.id}`}
              className="absolute rounded-full"
              style={{
                animation: `pulse ${sprinkle.animationDuration}s ease-in-out infinite`,
                animationDelay: `${sprinkle.id * 0.2}s`,
                left: `${sprinkle.left}%`,
                top: `${sprinkle.top}%`,
                width: `${sprinkle.width}px`,
                height: `${sprinkle.height}px`,
                backgroundColor:
                  currentTheme.sprinkleColors[sprinkle.colorIndex],
                opacity: getOpacityValue(currentIntensity.sprinkleOpacity),
                transform: `rotate(${sprinkle.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sparkle effects */}
      {sparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {sparklesData.map((sparkle) => (
            <div
              key={`sparkle-${sparkle.id}`}
              className="absolute"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animation: `spin ${sparkle.animationDuration}s linear infinite`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${
                    theme === "cake"
                      ? "#FDE68A"
                      : theme === "bakery"
                      ? "#FBBF24"
                      : theme === "celebration"
                      ? "#A78BFA"
                      : "#C0C0C0"
                  }, transparent)`,
                  opacity: getOpacityValue(currentIntensity.sparkleOpacity),
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
