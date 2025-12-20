"use client";

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaClipboard } from "react-icons/fa";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  orderNumber?: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    orderNumber: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const subjects = [
    "General Inquiry",
    "Custom Order Request",
    "Catering Inquiry",
    "Order Issue",
    "Feedback",
    "Wholesale Inquiry",
    "Career Opportunity",
  ];

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

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
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      orderNumber: "",
    });

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Send Us a Message
      </h2>
      <p className="text-gray-600 mb-8">
        Fill out the form below and we&apos;ll get back to you within 24 hours.
      </p>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <div className="font-semibold">✓ Message Sent Successfully!</div>
          <p className="text-sm mt-1">
            Thank you for contacting us. We&apos;ll respond to your inquiry as
            soon as possible.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            <FaUser className="inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-500 focus:border-transparent transition-all ${
              errors.name ? "border-primary" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-red-600 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email and Phone */}
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-500 focus:border-transparent transition-all ${
                errors.email ? "border-primary" : "border-gray-300"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              <FaPhone className="inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-500 focus:border-transparent transition-all"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {/* Subject and Order Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Subject *
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              title="Select a subject"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-500 focus:border-transparent transition-all ${
                errors.subject ? "border-primary" : "border-gray-300"
              }`}
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="mt-1 text-red-600 text-sm">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              <FaClipboard className="inline mr-2" />
              Order Number (Optional)
            </label>
            <input
              type="text"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-500 focus:border-transparent transition-all"
              placeholder="MSR-123456"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-500 focus:border-transparent transition-all ${
              errors.message ? "border-primary" : "border-gray-300"
            }`}
            placeholder="Please include as much detail as possible..."
          />
          {errors.message && (
            <p className="mt-1 text-red-600 text-sm">{errors.message}</p>
          )}
          <div className="mt-1 text-sm text-gray-500">
            {formData.message.length}/1000 characters
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-gray-700 mb-3 font-medium">
            Preferred Contact Method
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="contactMethod"
                value="email"
                defaultChecked
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-gray-700">Email</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-gray-700">Phone</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="contactMethod"
                value="either"
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-gray-700">Either</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending Message...
            </span>
          ) : (
            "Send Message"
          )}
        </button>

        <p className="text-center text-gray-500 text-sm">
          By submitting this form, you agree to our{" "}
          <a href="/privacy" className="text-red-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
