"use client";

import React from "react";
import { CartItem } from "@/types";
import { useDispatch } from "react-redux";
import { clearCart } from "@/state/cartSlice";
import Link from "next/link";
import { AppDispatch } from "@/state/store";

interface CartSummaryProps {
  cart: CartItem[];
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const shippingFee = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingFee + tax;

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-ptext">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-500">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-gray-500">
            {shippingFee === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `$${shippingFee.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="font-semibold text-gray-500">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-ptext">Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        {subtotal < 50 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
            <p className="text-yellow-700 text-sm">
              Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Link
          href="/checkout"
          className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
        >
          Proceed to Checkout
        </Link>

        <button
          onClick={handleClearCart}
          className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
        >
          Clear Cart
        </button>

        <Link
          href="/products"
          className="block w-full text-center text-gray-600 hover:text-primary transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t">
        <h3 className="font-bold mb-3 text-ptext">Accepted Payment Methods</h3>
        <div className="flex space-x-4">
          <div className="h-8 w-12 bg-amber-100 rounded"></div>
          <div className="h-8 w-12 bg-green-200 rounded"></div>
          <div className="h-8 w-12 bg-violet-200 rounded"></div>
          <div className="h-8 w-12 bg-pink-100 rounded"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          All transactions are secure and encrypted
        </p>
      </div>
    </div>
  );
}
