// Replace the static image with this SVG component
const CakePreviewSVG = ({ cake }) => {
  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Cake Base Layer */}
        <rect
          x="100"
          y="150"
          width="200"
          height="80"
          rx="10"
          fill={cake.flavor.color}
          className="transition-all duration-300"
        />

        {/* Frosting Layer */}
        <path
          d="M100 150 Q200 130 300 150"
          fill={
            cake.frosting.name === "Chocolate Ganache" ? "#5D4037" : "#FFF8E1"
          }
          stroke="#FFF"
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Filling Layer (if selected) */}
        {cake.filling.name !== "None" && (
          <rect
            x="100"
            y="180"
            width="200"
            height="20"
            fill={
              cake.filling.name.includes("Chocolate") ? "#5D4037" : "#FF6B6B"
            }
            opacity="0.7"
          />
        )}

        {/* Decorations */}
        {cake.decorations.find((d) => d.id === "sprinkles" && d.selected) && (
          <>
            <circle cx="120" cy="140" r="2" fill="#FF6B6B" />
            <circle cx="150" cy="130" r="2" fill="#4ECDC4" />
            <circle cx="180" cy="135" r="2" fill="#FFEAA7" />
            <circle cx="220" cy="140" r="2" fill="#DDA0DD" />
            <circle cx="250" cy="130" r="2" fill="#96CEB4" />
          </>
        )}

        {/* Text Personalization */}
        <text
          x="200"
          y="190"
          textAnchor="middle"
          fill={cake.personalization.color}
          fontFamily={
            cake.personalization.font === "Cursive" ? "cursive" : "sans-serif"
          }
          fontSize="14"
          className="transition-all duration-300"
        >
          {cake.personalization.text || "Happy Birthday!"}
        </text>

        {/* Extra: Candles */}
        {cake.extras.candles && (
          <>
            <rect x="190" y="80" width="4" height="40" fill="#FFD700" />
            <circle cx="192" cy="80" r="6" fill="#FF6B6B" />
            <rect x="210" y="85" width="4" height="35" fill="#FFD700" />
            <circle cx="212" cy="85" r="6" fill="#4ECDC4" />
          </>
        )}
      </svg>

      {/* Design Style Badge */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary capitalize">
        {cake.designStyle} Style
      </div>

      {/* Selected Decorations Badge */}
      {cake.decorations.filter((d) => d.selected).length > 0 && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-green-600">
          {cake.decorations.filter((d) => d.selected).length} Decorations
        </div>
      )}
    </div>
  );
};
export default CakePreviewSVG;
