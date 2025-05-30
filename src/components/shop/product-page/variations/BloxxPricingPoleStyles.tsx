"use client";

import React, { useEffect, useState } from "react";

interface PoleStyles {
  [key: string]: string; // Example: { square: "url", round: "url", ... }
}

interface Props {
  selectedPoleStyle: string | null;
  onSelectionChange: (selectedStyle: string) => void; // Pass the selected style back
  setSelectedPoleStyle: (selectedStyle: string) => void; // Pass the selected style back
  selectedShape: string | null; // required for filtering styles
}

const BloxxPricingPoleStyles = ({
  onSelectionChange,
  selectedPoleStyle,
  selectedShape,
}: Props) => {
  const [poleStyles, setPoleStyles] = useState<PoleStyles | null>(null);

  // Fetch pole styles from global JSON
  useEffect(() => {
    const categoryScript = document.getElementById("product-category-custom");
    if (categoryScript) {
      const data = JSON.parse(categoryScript.textContent || "{}");
      if (data.poleStyles) {
        setPoleStyles(data.poleStyles);
      }
    }
  }, []);

  if (!poleStyles) return null; // Render nothing if no poleStyles available

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold text-gray-600">Pole Shape Styles</h3>
      <div className="grid grid-cols-2 gap-3 mt-2 md:grid-cols-4">
        {Object.entries(poleStyles)
          .filter(([key]) => {
            // Only shows styles relevant to the selected pole shape
            if (!selectedShape) return false;
            const visibleStylesMap: { [key: string]: string[] } = {
              square: ["square", "square_octagon"],
              round: ["round"],
              octagon: ["round_octagon"],
            };
            return visibleStylesMap[selectedShape.toLowerCase()]?.includes(key);
          })
          .map(([key, imageUrl]) => (
            <label
              key={key}
              className={`flex items-center justify-center w-20 h-20 border-4 rounded-none ${
                selectedPoleStyle === key
                  ? "border-blue-600"
                  : "border-gray-300"
              } hover:border-blue-600 cursor-pointer`}
            >
              <input
                type="radio"
                name="poleStyle"
                value={key}
                checked={selectedPoleStyle === key}
                onChange={() => {
                  console.log("Selected Style [BloxxPricingPoleStyles]:", key); // Debugging
                  onSelectionChange(key); // Notify parent of selection
                }}
                className="sr-only"
              />
              <img src={imageUrl} alt={key} className="w-20 h-20" />
            </label>
          ))}
      </div>
    </div>
  );
};

export default BloxxPricingPoleStyles;
