"use client";

import React, { useState } from "react";
import { CheckoutFormData } from "@/types";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaCreditCard,
} from "react-icons/fa";
import Link from "next/link";

export default function CheckoutForm() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    notes: "",
  });

  const [shippingMethod, setShippingMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingMethods = [
    {
      id: "pickup",
      label: "Store Pickup",
      price: 0,
      time: "Ready in 2-3 hours",
    },
    {
      id: "delivery",
      label: "Standard Delivery",
      price: 9.99,
      time: "1-2 business days",
    },
    {
      id: "express",
      label: "Express Delivery",
      price: 19.99,
      time: "Same day",
    },
  ];

  const paymentMethods = [
    { id: "credit-card", label: "Credit Card" },
    { id: "paypal", label: "PayPal" },
    { id: "apple-pay", label: "Apple Pay" },
    { id: "cash", label: "Cash on Delivery" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Checkout data:", {
      ...formData,
      shippingMethod,
      paymentMethod,
    });

    // In a real app, you would redirect to order confirmation
    // router.push("/order-confirmation");
    setIsSubmitting(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipping Method */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-primary-dark">
            Shipping Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shippingMethods.map((method) => (
              <label
                key={method.id}
                className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                  shippingMethod === method.id
                    ? "border-primary bg-primary-100"
                    : "border-gray-300 hover:border-primary-300"
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={method.id}
                  checked={shippingMethod === method.id}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="sr-only"
                />
                <div className="font-semibold">{method.label}</div>
                <div className="text-gray-600 text-sm mt-1">{method.time}</div>
                <div className="font-bold mt-2">
                  {method.price === 0 ? "FREE" : `$${method.price.toFixed(2)}`}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div className="text-ptext">
          <h3 className="text-lg font-bold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                <FaUser className="inline mr-2" />
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-1000  focus:border-transparent outline-none ${
                  errors.firstName ? "border-primary-1000" : "border-gray-300"
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-primary text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                <FaUser className="inline mr-2" />
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-1000 focus:border-transparent outline-none ${
                  errors.lastName ? "border-primary-1000" : "border-gray-300"
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-primary text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              <FaEnvelope className="inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-1000 focus:border-transparent outline-none text-ptext ${
                errors.email ? "border-primary-1000" : "border-gray-300"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-primary text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              <FaPhone className="inline mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-1000 focus:border-transparent outline-none text-ptext ${
                errors.phone ? "border-primary-1000" : "border-gray-300"
              }`}
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-primary text-sm">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="text-ptext">
          <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                <FaMapMarkerAlt className="inline mr-2" />
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-1000 focus:border-transparent text-ptext outline-none ${
                  errors.address ? "border-primary-1000" : "border-gray-300"
                }`}
                placeholder="123 Main St"
              />
              {errors.address && (
                <p className="mt-1 text-primary text-sm">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  <FaCity className="inline mr-2" />
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-1000 focus:border-transparent outline-none ${
                    errors.city ? "border-primary-1000" : "border-gray-300"
                  }`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="mt-1 text-primary text-sm">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-1000 focus:border-transparent outline-none ${
                    errors.zipCode ? "border-primary-1000" : "border-gray-300"
                  }`}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="mt-1 text-primary text-sm">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Notes */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Order Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-1000 focus:border-transparent text-ptext outline-none"
            placeholder="Special instructions, delivery notes, etc."
          />
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-ptext">Payment Method</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all text-ptext ${
                  paymentMethod === method.id
                    ? "border-primary bg-primary-100"
                    : "border-gray-300 hover:border-primary-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="sr-only"
                />
                <div className="font-semibold text-center">{method.label}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Credit Card Fields (conditionally shown) */}
        {paymentMethod === "credit-card" && (
          <div className="p-6 bg-gray-50 rounded-lg border">
            <h4 className="font-bold mb-4 flex items-center">
              <FaCreditCard className="mr-2" />
              Credit Card Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Card Holder</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 text-primary rounded focus:ring-red-500 mt-1"
            required
          />
          <label htmlFor="terms" className="ml-2 text-gray-700 text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            . *
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Processing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
