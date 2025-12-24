import React, { useMemo } from "react";

export interface CakeConfiguration {
  size: {
    name: string;
    servings: string;
    price: number;
  };
  flavor: {
    name: string;
    description: string;
    price: number;
    color: string;
  };
  frosting: {
    name: string;
    type: string;
    price: number;
  };
  filling: {
    name: string;
    description: string;
    price: number;
  };
  occasion: {
    name: string;
    theme: string;
    price: number;
  };
  decorations: {
    id: string;
    name: string;
    price: number;
    selected: boolean;
  }[];
  personalization: {
    text: string;
    font: string;
    color: string;
  };
  extras: {
    candles: boolean;
    topper: boolean;
    edibleImage: boolean;
    freshFlowers: boolean;
    sparklers: boolean;
  };
  designStyle: string;
  dietaryRequirements: string[];
  deliveryDate: string;
  specialInstructions: string;
}

const CSSCakePreview = ({ cake }: { cake: CakeConfiguration }) => {
  const hasSprinkles = cake.decorations.some(
    (d) => d.id === "sprinkles" && d.selected
  );

  const [sprinklesPositions, setSprinklesPositions] = React.useState<
    { key: number; left: string; top: string; rotate: string; color: string }[]
  >([]);

  React.useEffect(() => {
    if (!hasSprinkles) {
      setSprinklesPositions([]);
      return;
    }
    const positions = Array.from({ length: 20 }).map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotate: `${Math.random() * 360}deg`,
      color: ["#FF6B6B", "#4ECDC4", "#FFEAA7", "#DDA0DD"][i % 4],
    }));
    setSprinklesPositions(positions);
  }, [hasSprinkles]);

  return (
    <div className="relative h-64 flex items-center justify-center">
      {/* 3D Cake Container */}
      <div className="relative w-48 h-48 perspective-1000">
        {/* Cake tiers based on size */}
        {cake.size.name === "Large" && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-linear-to-r from-yellow-200 to-yellow-300 rounded-t-lg" />
        )}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-32">
          {/* Main cake body */}
          <div
            className="w-full h-full rounded-lg rounded-b-none relative overflow-hidden"
            style={{ backgroundColor: cake.flavor.color }}
          >
            {/* Frosting drip effect */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-linear-to-r from-pink-100 to-yellow-100 rounded-t-lg" />

            {/* Filling layer indicator */}
            {cake.filling.name !== "None" && (
              <div className="absolute top-1/2 left-2 right-2 h-2 bg-red-200 rounded-full opacity-70" />
            )}

            {/* Sprinkles */}
            {cake.decorations.find(
              (d) => d.id === "sprinkles" && d.selected
            ) && (
              <div className="absolute inset-0">
                {sprinklesPositions.map((p) => (
                  <div
                    key={p.key}
                    className="absolute w-1 h-3 rounded-full"
                    style={{
                      left: p.left,
                      top: p.top,
                      backgroundColor: p.color,
                      transform: `rotate(${p.rotate})`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cake topper */}
          {cake.extras.topper && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-3xl">
              👑
            </div>
          )}

          {/* Candles */}
          {cake.extras.candles && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-1 h-8 bg-yellow-400">
                <div className="w-3 h-3 bg-red-500 rounded-full -top-1 relative" />
              </div>
              <div className="w-1 h-10 bg-yellow-400">
                <div className="w-3 h-3 bg-blue-500 rounded-full -top-1 relative" />
              </div>
            </div>
          )}
        </div>

        {/* Cake plate */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-44 h-2 bg-gray-300 rounded-lg" />
      </div>

      {/* Personalization text */}
      <div
        className="absolute bottom-4 left-0 right-0 text-center font-bold"
        style={{
          color: cake.personalization.color,
          fontFamily:
            cake.personalization.font === "Cursive" ? "cursive" : "inherit",
          fontSize: cake.personalization.text.length > 20 ? "12px" : "16px",
        }}
      >
        {cake.personalization.text}
      </div>
    </div>
  );
};

export default CSSCakePreview;
