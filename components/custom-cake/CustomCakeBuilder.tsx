"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/state/cartSlice";
import { AppDispatch } from "@/state/store";
import { motion } from "framer-motion";
import {
  FaBirthdayCake,
  FaPalette,
  FaMagic,
  FaPenFancy,
  FaCrown,
  FaLeaf,
  FaStar,
  FaShoppingCart,
  FaShare,
  FaDownload,
} from "react-icons/fa";
import CSSCakePreview from "../CSScakePreview";

// Types
interface CakeConfiguration {
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

const initialCakeConfig: CakeConfiguration = {
  size: {
    name: "Medium",
    servings: "Serves 12-16",
    price: 29.99,
  },
  flavor: {
    name: "Classic Vanilla",
    description: "Light and fluffy vanilla sponge",
    price: 0,
    color: "#FFF8E1",
  },
  frosting: {
    name: "Buttercream",
    type: "Classic",
    price: 0,
  },
  filling: {
    name: "None",
    description: "No additional filling",
    price: 0,
  },
  occasion: {
    name: "Birthday",
    theme: "Celebration",
    price: 0,
  },
  decorations: [
    {
      id: "sprinkles",
      name: "Rainbow Sprinkles",
      price: 2.99,
      selected: false,
    },
    { id: "flowers", name: "Edible Flowers", price: 5.99, selected: false },
    { id: "fruit", name: "Fresh Fruit Topping", price: 4.99, selected: false },
    {
      id: "chocolate",
      name: "Chocolate Drizzle",
      price: 3.99,
      selected: false,
    },
    { id: "gold", name: "Gold Leaf Accents", price: 8.99, selected: false },
    { id: "pearls", name: "Sugar Pearls", price: 3.49, selected: false },
  ],
  personalization: {
    text: "Happy Birthday!",
    font: "Cursive",
    color: "#FF6B6B",
  },
  extras: {
    candles: false,
    topper: false,
    edibleImage: true,
    freshFlowers: false,
    sparklers: false,
  },
  designStyle: "modern",
  dietaryRequirements: [],
  deliveryDate: "",
  specialInstructions: "",
};

// Options
const sizes = [
  { name: "Petite", servings: "Serves 4-6", price: 19.99 },
  { name: "Small", servings: "Serves 8-10", price: 24.99 },
  { name: "Medium", servings: "Serves 12-16", price: 29.99 },
  { name: "Large", servings: "Serves 20-24", price: 39.99 },
  { name: "XL", servings: "Serves 30-35", price: 54.99 },
];

const flavors = [
  {
    name: "Classic Vanilla",
    description: "Light and fluffy vanilla sponge",
    price: 0,
    color: "#FFF8E1",
  },
  {
    name: "Chocolate Fudge",
    description: "Rich chocolate cake with fudge",
    price: 2.99,
    color: "#5D4037",
  },
  {
    name: "Red Velvet",
    description: "Moist red velvet with cream cheese",
    price: 3.99,
    color: "#D32F2F",
  },
  {
    name: "Carrot Cake",
    description: "Spiced carrot cake with walnuts",
    price: 3.49,
    color: "#FF9800",
  },
  {
    name: "Lemon Raspberry",
    description: "Tangy lemon with raspberry filling",
    price: 4.99,
    color: "#FFEB3B",
  },
  {
    name: "Cookies & Cream",
    description: "Chocolate cake with cookie crumbles",
    price: 3.99,
    color: "#795548",
  },
  {
    name: "Salted Caramel",
    description: "Buttery cake with salted caramel",
    price: 4.49,
    color: "#FFA726",
  },
];

const frostings = [
  { name: "Buttercream", type: "Classic", price: 0 },
  { name: "Cream Cheese", type: "Tangy", price: 1.99 },
  { name: "Chocolate Ganache", type: "Rich", price: 2.99 },
  { name: "Whipped Cream", type: "Light", price: 1.49 },
  { name: "Fondant", type: "Smooth", price: 4.99 },
  { name: "Italian Meringue", type: "Silky", price: 3.99 },
];

const fillings = [
  { name: "None", description: "No additional filling", price: 0 },
  {
    name: "Raspberry Jam",
    description: "Sweet and tangy raspberry",
    price: 2.99,
  },
  {
    name: "Chocolate Mousse",
    description: "Rich chocolate mousse",
    price: 3.99,
  },
  { name: "Lemon Curd", description: "Zesty lemon curd", price: 3.49 },
  {
    name: "Salted Caramel",
    description: "Buttery salted caramel",
    price: 3.99,
  },
  {
    name: "Fresh Strawberry",
    description: "Fresh strawberry compote",
    price: 3.49,
  },
];

const occasions = [
  { name: "Birthday", theme: "Celebration", price: 0 },
  { name: "Wedding", theme: "Elegant", price: 15.99 },
  { name: "Anniversary", theme: "Romantic", price: 9.99 },
  { name: "Baby Shower", theme: "Cute", price: 7.99 },
  { name: "Graduation", theme: "Academic", price: 6.99 },
  { name: "Corporate", theme: "Professional", price: 8.99 },
  { name: "Holiday", theme: "Festive", price: 5.99 },
];

const designStyles = [
  { id: "modern", name: "Modern", icon: "🎨" },
  { id: "classic", name: "Classic", icon: "👑" },
  { id: "rustic", name: "Rustic", icon: "🍂" },
  { id: "minimalist", name: "Minimalist", icon: "⚪" },
  { id: "whimsical", name: "Whimsical", icon: "✨" },
  { id: "themed", name: "Themed", icon: "🎭" },
];

const fonts = ["Cursive", "Script", "Print", "Bold", "Elegant"];
const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
];

const dietaryOptions = [
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Egg-Free",
  "Vegan",
  "Sugar-Free",
];

export default function CustomCakeBuilder() {
  const dispatch = useDispatch<AppDispatch>();
  const [cake, setCake] = useState<CakeConfiguration>(initialCakeConfig);
  const [currentStep, setCurrentStep] = useState(1);
  const [inspirationImages, setInspirationImages] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Calculate preview image based on current cake state
  const previewImage = `/cake-${cake.flavor.name
    .toLowerCase()
    .replace(/\s+/g, "-")}.jpg`;

  // Calculate total price
  const calculateTotal = () => {
    let total =
      cake.size.price +
      cake.flavor.price +
      cake.frosting.price +
      cake.filling.price +
      cake.occasion.price;

    // Add decorations
    cake.decorations.forEach((decoration) => {
      if (decoration.selected) total += decoration.price;
    });

    // Add extras
    if (cake.extras.candles) total += 3.99;
    if (cake.extras.topper) total += 9.99;
    if (cake.extras.edibleImage) total += 12.99;
    if (cake.extras.freshFlowers) total += 15.99;
    if (cake.extras.sparklers) total += 4.99;

    return total;
  };

  const totalPrice = calculateTotal();

  const handleSizeChange = (size: (typeof sizes)[0]) => {
    setCake({ ...cake, size });
  };

  const handleFlavorChange = (flavor: (typeof flavors)[0]) => {
    setCake({ ...cake, flavor });
  };

  const handleDecorationToggle = (id: string) => {
    setCake({
      ...cake,
      decorations: cake.decorations.map((dec) =>
        dec.id === id ? { ...dec, selected: !dec.selected } : dec
      ),
    });
  };

  const handleExtraToggle = (extra: keyof CakeConfiguration["extras"]) => {
    setCake({
      ...cake,
      extras: {
        ...cake.extras,
        [extra]: !cake.extras[extra],
      },
    });
  };

  const handlePersonalizationChange = (
    field: keyof CakeConfiguration["personalization"],
    value: string
  ) => {
    setCake({
      ...cake,
      personalization: {
        ...cake.personalization,
        [field]: value,
      },
    });
  };

  const handleDietaryToggle = (requirement: string) => {
    setCake({
      ...cake,
      dietaryRequirements: cake.dietaryRequirements.includes(requirement)
        ? cake.dietaryRequirements.filter((r) => r !== requirement)
        : [...cake.dietaryRequirements, requirement],
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setInspirationImages((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const cakeItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${cake.occasion.name} Cake`,
      price: totalPrice,
      size: cake.size.name,
      color: cake.flavor.name,
      count: 1,
      customDetails: {
        flavor: cake.flavor.name,
        frosting: cake.frosting.name,
        filling: cake.filling.name,
        occasion: cake.occasion.name,
        personalization: cake.personalization,
        decorations: cake.decorations
          .filter((d) => d.selected)
          .map((d) => d.name),
        extras: Object.entries(cake.extras)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        dietaryRequirements: cake.dietaryRequirements,
      },
    };

    dispatch(addToCart({ item: cakeItem }));

    // Show success message
    alert("Your custom cake has been added to cart!");
  };

  const steps = [
    { number: 1, title: "Size & Flavor", icon: <FaBirthdayCake /> },
    { number: 2, title: "Frosting & Fillings", icon: <FaLeaf /> },
    { number: 3, title: "Occasion & Style", icon: <FaCrown /> },
    { number: 4, title: "Decorations", icon: <FaStar /> },
    { number: 5, title: "Personalization", icon: <FaPenFancy /> },
    { number: 6, title: "Extras & Finalize", icon: <FaMagic /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-linear-to-r from-primary-100 to-primary-400 p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-center mb-4 md:mb-0 ${
                currentStep === step.number
                  ? "text-primary font-bold"
                  : "text-gray-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  currentStep === step.number
                    ? "bg-primary text-white"
                    : currentStep > step.number
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100"
                }`}
              >
                {step.icon}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm">Step {step.number}</div>
                <div className="font-semibold">{step.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        {/* Left Column - Configuration */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Size & Flavor */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
                  <FaBirthdayCake className="mr-3 text-primary" />
                  Select Cake Size
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => handleSizeChange(size)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        cake.size.name === size.name
                          ? "border-secondary bg-primary-100"
                          : "border-gray-300 hover:border-primary-400"
                      }`}
                    >
                      <div className="font-bold text-lg text-ptext">
                        {size.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {size.servings}
                      </div>
                      <div className="font-bold text-primary mt-2">
                        ${size.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaPalette className="mr-3 text-primary" />
                  Choose Cake Flavor
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {flavors.map((flavor) => (
                    <button
                      key={flavor.name}
                      onClick={() => handleFlavorChange(flavor)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        cake.flavor.name === flavor.name
                          ? "border-secondary bg-primary-100"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-lg text-primary">
                            {flavor.name}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {flavor.description}
                          </div>
                        </div>
                        <div
                          className="w-8 h-8 rounded-full border"
                          style={{ backgroundColor: flavor.color }}
                        />
                      </div>
                      <div className="font-bold text-primary mt-2">
                        {flavor.price > 0
                          ? `+$${flavor.price.toFixed(2)}`
                          : "Included"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Frosting & Fillings */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Frosting Type
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {frostings.map((frosting) => (
                    <button
                      key={frosting.name}
                      onClick={() => setCake({ ...cake, frosting })}
                      className={`p-4 rounded-xl border-2 text-ptext transition-all ${
                        cake.frosting.name === frosting.name
                          ? "border-secondary bg-primary-100"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <div className="font-bold text-lg">{frosting.name}</div>
                      <div className="text-gray-600 text-sm">
                        {frosting.type}
                      </div>
                      <div className="font-bold text-primary mt-2">
                        {frosting.price > 0
                          ? `+$${frosting.price.toFixed(2)}`
                          : "Included"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Filling Selection
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {fillings.map((filling) => (
                    <button
                      key={filling.name}
                      onClick={() => setCake({ ...cake, filling })}
                      className={`p-4 rounded-xl border-2 transition-all text-ptext ${
                        cake.filling.name === filling.name
                          ? "border-secondary bg-primary-100"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <div className="font-bold text-lg">{filling.name}</div>
                      <div className="text-gray-600 text-sm">
                        {filling.description}
                      </div>
                      <div className="font-bold text-primary mt-2">
                        {filling.price > 0
                          ? `+$${filling.price.toFixed(2)}`
                          : "Included"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Occasion & Style */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Occasion
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {occasions.map((occasion) => (
                    <button
                      key={occasion.name}
                      onClick={() => setCake({ ...cake, occasion })}
                      className={`p-4 rounded-xl border-2 transition-all text-ptext ${
                        cake.occasion.name === occasion.name
                          ? "border-secondary bg-primary-100"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <div className="font-bold text-lg">{occasion.name}</div>
                      <div className="text-gray-600 text-sm">
                        {occasion.theme}
                      </div>
                      <div className="font-bold text-primary mt-2">
                        {occasion.price > 0
                          ? `+$${occasion.price.toFixed(2)}`
                          : "Included"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Design Style
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {designStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() =>
                        setCake({ ...cake, designStyle: style.id })
                      }
                      className={`p-4 rounded-xl border-2 transition-all ${
                        cake.designStyle === style.id
                          ? "border-secondary bg-primary-100"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <div className="text-2xl mb-2">{style.icon}</div>
                      <div className="font-bold text-lg text-ptext">
                        {style.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Upload Inspiration
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="inspiration-upload"
                  />
                  <label
                    htmlFor="inspiration-upload"
                    className="cursor-pointer block"
                  >
                    <div className="text-4xl mb-4">📷</div>
                    <div className="font-semibold mb-2 text-gray-400">
                      Upload a photo for inspiration
                    </div>
                    <div className="text-gray-600 text-sm">
                      We&apos;ll use this to understand your vision
                    </div>
                  </label>
                  {uploadedImage && (
                    <div className="mt-4">
                      <img
                        src={uploadedImage}
                        alt="Inspiration"
                        className="max-h-40 mx-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Decorations */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Choose Decorations
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cake.decorations.map((decoration) => (
                    <button
                      key={decoration.id}
                      onClick={() => handleDecorationToggle(decoration.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-ptext ${
                        decoration.selected
                          ? "border-secondary bg-primary-100"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <div className="font-bold text-lg">{decoration.name}</div>
                      <div className="font-bold text-primary mt-2">
                        +${decoration.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Dietary Requirements
                </h3>
                <div className="flex flex-wrap gap-3">
                  {dietaryOptions.map((requirement) => (
                    <button
                      key={requirement}
                      onClick={() => handleDietaryToggle(requirement)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        cake.dietaryRequirements.includes(requirement)
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {requirement}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Personalization */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Personalized Message
                </h3>
                <textarea
                  value={cake.personalization.text}
                  onChange={(e) =>
                    handlePersonalizationChange("text", e.target.value)
                  }
                  className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl focus:border-secondary focus:ring-primary-200 outline-none text-gray-500"
                  placeholder="What message would you like on your cake?"
                  maxLength={50}
                />
                <div className="text-sm text-gray-500 mt-2">
                  {cake.personalization.text.length}/50 characters
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Font Style
                </h3>
                <div className="flex flex-wrap gap-3">
                  {fonts.map((font) => (
                    <button
                      key={font}
                      onClick={() => handlePersonalizationChange("font", font)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        cake.personalization.font === font
                          ? "bg-secondary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Text Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        handlePersonalizationChange("color", color)
                      }
                      className={`w-10 h-10 rounded-full border-2 ${
                        cake.personalization.color === color
                          ? "border-gray-800"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6: Extras & Finalize */}
          {currentStep === 6 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Extra Add-ons
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(cake.extras).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() =>
                        handleExtraToggle(
                          key as keyof CakeConfiguration["extras"]
                        )
                      }
                      className={`p-4 rounded-xl border-2 text-ptext transition-all ${
                        value
                          ? "border-secondary bg-primary-100"
                          : "border-gray-300 hover:border-primary-300"
                      }`}
                    >
                      <div className="font-bold text-lg">
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </div>
                      <div className="font-bold text-primary mt-2">
                        +$
                        {key === "candles"
                          ? "3.99"
                          : key === "topper"
                          ? "9.99"
                          : key === "edibleImage"
                          ? "12.99"
                          : key === "freshFlowers"
                          ? "15.99"
                          : "4.99"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Delivery Date
                </h3>
                <input
                  aria-label="date"
                  type="date"
                  value={cake.deliveryDate}
                  onChange={(e) =>
                    setCake({ ...cake, deliveryDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-secondary focus:ring-secondary outline-none text-gray-400"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Special Instructions
                </h3>
                <textarea
                  value={cake.specialInstructions}
                  onChange={(e) =>
                    setCake({ ...cake, specialInstructions: e.target.value })
                  }
                  className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl focus:border-secondary focus:ring-secondary outline-none text-gray-500"
                  placeholder="Any special instructions for our bakers?"
                />
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentStep < steps.length) {
                  setCurrentStep(currentStep + 1);
                } else {
                  handleAddToCart();
                }
              }}
              className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors cursor-pointer"
            >
              {currentStep < steps.length ? "Next Step" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Right Column - Preview & Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Cake Preview */}
            <div className="bg-gray-100 rounded-xl p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Cake Preview
              </h3>
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                {/* <img
                  src={previewImage}
                  alt="Cake Preview"
                  className="w-full h-full object-cover"
                /> */}

                {/* <CakePreviewSVG cake={cake} /> */}
                <CSSCakePreview cake={cake} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                  Preview
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold text-ptext">
                    {cake.size.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Flavor:</span>
                  <span className="font-semibold text-ptext">
                    {cake.flavor.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occasion:</span>
                  <span className="font-semibold text-ptext">
                    {cake.occasion.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Base Cake ({cake.size.name})</span>
                  <span className="font-semibold">
                    ${cake.size.price.toFixed(2)}
                  </span>
                </div>
                {cake.flavor.price > 0 && (
                  <div className="flex justify-between  text-gray-500">
                    <span>{cake.flavor.name} Flavor</span>
                    <span className="font-semibold">
                      +${cake.flavor.price.toFixed(2)}
                    </span>
                  </div>
                )}
                {cake.frosting.price > 0 && (
                  <div className="flex justify-between  text-gray-500">
                    <span>{cake.frosting.name} Frosting</span>
                    <span className="font-semibold">
                      +${cake.frosting.price.toFixed(2)}
                    </span>
                  </div>
                )}
                {cake.filling.price > 0 && (
                  <div className="flex justify-between  text-gray-500">
                    <span>{cake.filling.name} Filling</span>
                    <span className="font-semibold">
                      +${cake.filling.price.toFixed(2)}
                    </span>
                  </div>
                )}
                {cake.occasion.price > 0 && (
                  <div className="flex justify-between  text-gray-500">
                    <span>{cake.occasion.name} Design</span>
                    <span className="font-semibold">
                      +${cake.occasion.price.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Selected Decorations */}
                {cake.decorations
                  .filter((d) => d.selected)
                  .map((decoration) => (
                    <div
                      key={decoration.id}
                      className="flex justify-between  text-gray-500"
                    >
                      <span>{decoration.name}</span>
                      <span className="font-semibold">
                        +${decoration.price.toFixed(2)}
                      </span>
                    </div>
                  ))}

                {/* Selected Extras */}
                {Object.entries(cake.extras)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <div
                      key={key}
                      className="flex justify-between  text-gray-500"
                    >
                      <span>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="font-semibold text-gray-500">
                        +$
                        {key === "candles"
                          ? "3.99"
                          : key === "topper"
                          ? "9.99"
                          : key === "edibleImage"
                          ? "12.99"
                          : key === "freshFlowers"
                          ? "15.99"
                          : "4.99"}
                      </span>
                    </div>
                  ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold  text-primary">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart - ${totalPrice.toFixed(2)}
                </button>

                <button className="w-full border-2 border-secondary text-primary-400 py-3 rounded-lg font-bold flex items-center justify-center hover:bg-primary-100 transition-colors">
                  <FaShare className="mr-2" />
                  Share Design
                </button>

                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <FaDownload className="mr-2" />
                  Save for Later
                </button>
              </div>

              {/* Estimated Timeline */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-bold mb-2 text-secondary">
                  Estimated Timeline
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Design Consultation:</span>
                    <span className="font-semibold">1-2 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Production Time:</span>
                    <span className="font-semibold">3-5 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery/Pickup:</span>
                    <span className="font-semibold">As scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
