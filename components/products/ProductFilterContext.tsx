"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  features: {
    newArrivals: boolean;
    bestSellers: boolean;
    glutenFree: boolean;
  };
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 100],
    minRating: 0,
    features: {
      newArrivals: false,
      bestSellers: false,
      glutenFree: false,
    },
  });

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 100],
      minRating: 0,
      features: {
        newArrivals: false,
        bestSellers: false,
        glutenFree: false,
      },
    });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
