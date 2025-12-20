"use client";

import { CartItem } from "@/types";

interface CartBadgeProps {
  cart: CartItem[];
}

export default function CartBadge({ cart }: CartBadgeProps) {
  if (!cart || cart?.length === 0) return null;

  return (
    <span className="absolute right-0 top-0 bg-green-300 text-gray-950 font-bold text-sm h-[14px] min-w-[13px] rounded-full flex items-center justify-center px-1">
      {cart?.length}
    </span>
  );
}
