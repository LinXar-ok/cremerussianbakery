"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I place a custom cake order?",
    answer:
      "You can place a custom cake order by filling out our Custom Cake form on the website, calling us directly at (555) 123-4567, or visiting our bakery in person. We recommend placing custom orders at least 72 hours in advance.",
    category: "Orders",
  },
  {
    question: "What is your delivery area and fee?",
    answer:
      "We deliver within a 20-mile radius of our bakery for a flat fee of $9.99. Orders over $75 qualify for free delivery. Delivery times are available Tuesday-Sunday from 9 AM to 6 PM.",
    category: "Delivery",
  },
  {
    question: "Do you offer gluten-free options?",
    answer:
      "Yes! We have a selection of gluten-free cakes, pastries, and cookies. Please note that while we take precautions, our kitchen is not 100% gluten-free. For severe allergies, we recommend our dedicated allergy-friendly items.",
    category: "Dietary",
  },
  {
    question: "How far in advance should I order?",
    answer:
      "For regular items: 24 hours. For custom cakes: 72 hours minimum, 1-2 weeks for weddings or large orders. During holidays, we recommend ordering 1-2 weeks in advance.",
    category: "Orders",
  },
  {
    question: "Do you offer catering for events?",
    answer:
      "Yes! We provide catering for events of all sizes. Our catering menu includes dessert tables, custom cake displays, and assorted pastry platters. Contact our catering department for a custom quote.",
    category: "Catering",
  },
  {
    question: "What are your payment methods?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and cash. For large orders, we require a 50% deposit at the time of booking.",
    category: "Payment",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "You can modify your order up to 24 hours before pickup/delivery. Cancellations within 24 hours are subject to a 25% fee. Custom orders cancelled within 48 hours are non-refundable.",
    category: "Orders",
  },
  {
    question: "How should I store my cake?",
    answer:
      "Cakes with buttercream or cream cheese frosting should be refrigerated. Fondant cakes should be kept at room temperature. All cakes are best consumed within 3-4 days of purchase.",
    category: "Storage",
  },
  {
    question: "Do you ship nationwide?",
    answer:
      "Currently, we only ship cookies and select dry goods within the continental US. Cakes and fresh pastries are only available for local pickup or delivery due to freshness concerns.",
    category: "Shipping",
  },
  {
    question: "What are your allergen policies?",
    answer:
      "We clearly label all allergens. Common allergens (nuts, dairy, eggs, gluten, soy) are present in our facility. For severe allergies, we offer limited items prepared in a separate area with dedicated equipment.",
    category: "Dietary",
  },
];

const categories = [
  "All",
  "Orders",
  "Delivery",
  "Dietary",
  "Catering",
  "Payment",
  "Storage",
  "Shipping",
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = faqData.filter(
    (faq) => selectedCategory === "All" || faq.category === selectedCategory
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-10">
        <FaQuestionCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Can&apos;t find the answer you&apos;re looking for? Contact our
          support team.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {faq.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
              </div>
              {openIndex === index ? (
                <FaChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <FaChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4">
                <div className="pl-16">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer support team is here to help you with any other
            questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="tel:5551234567"
              className="inline-block border-2 border-red-600 text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors"
            >
              Call Now: (555) 123-4567
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
