"use client";

import Link from "next/link";
import { FaCheckCircle, FaShippingFast, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    // Generate order number only on client side
    setOrderNumber("MSR" + Math.floor(Math.random() * 1000000));
  }, []);

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 text-center py-20">
        <FaCheckCircle className="h-24 w-24 text-green-500 mx-auto mb-8" />

        <h1 className="text-5xl font-bold text-green-600 mb-4 font-serif">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your order. We&apos;re preparing it with love!
        </p>

        <div className="bg-gray-50 p-8 rounded-2xl mb-8">
          <p className="text-2xl font-bold mb-2">
            Order #{orderNumber || "..."}
          </p>
          <p className="text-gray-600">
            We&apos;ve sent a confirmation email with your order details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-blue-50 rounded-xl">
            <FaShippingFast className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Pickup Information</h3>
            <p className="text-gray-600">Ready in 2-3 hours at our bakery</p>
          </div>
          <div className="p-6 bg-red-50 rounded-xl">
            <FaPhone className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="text-gray-600">Call us at (555) 123-4567</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
