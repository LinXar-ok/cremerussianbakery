"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import Link from "next/link";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  interface ContactInfo {
    icon: React.ReactNode;
    title: string;
    detail: string;
    link?: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission
    console.log(formData as FormData);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      detail: "123 Baker Street, Pastry Town, PT 12345",
      link: "https://maps.google.com",
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      detail: "(555) 123-4567",
      link: "tel:5551234567",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      detail: "hello@crèmerussianbakerys.com",
      link: "mailto:hello@crèmerussianbakery.com",
    },
    {
      icon: <FaClock />,
      title: "Hours",
      detail: "Mon-Sat: 7AM-8PM, Sun: 8AM-6PM",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-roaster text-center text-primary mb-4">
          Get In Touch
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions about custom orders or just want to say hello?
          We&apos;d love to hear from you!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  title="Name"
                  placeholder="Your full name"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-ptext outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  title="Email"
                  placeholder="you@example.com"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-ptext outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  title="Message"
                  placeholder="Write your message..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-ptext outline-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-primary transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-primary text-xl mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-primary-dark">
                      {item.title}
                    </h3>
                    {item.link ? (
                      <Link
                        href={item.link}
                        className="text-gray-600 hover:text-primary-dark transition-colors"
                      >
                        {item.detail}
                      </Link>
                    ) : (
                      <p className="text-gray-600">{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-8 h-64 bg-gray-200 rounded-lg overflow-hidden">
                {/* Replace with actual map component */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map Location
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
