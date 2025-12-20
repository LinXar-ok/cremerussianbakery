"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Link from "next/link";
import CartSummary from "@/components/carts/CartSummary";
import CheckoutForm from "@/components/carts/CheckoutForm";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.cart);

  if (cart.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4 font-serif">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some delicious treats to get started!
          </p>
          <Link
            href="/products"
            className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-8 font-serif">
          Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Order Details</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.count}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.price * item.count).toFixed(2)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <CartSummary cart={cart} />
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
