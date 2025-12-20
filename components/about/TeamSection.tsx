"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    pinterest?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Maria Richardson",
    role: "Founder & Head Baker",
    bio: "With over 20 years of baking experience, Maria's passion for creating beautiful, delicious treats started in her grandmother's kitchen. She oversees all recipes and ensures every item meets her high standards.",
    image: "/maria.jpg",
    social: {
      facebook: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Pastry Chef",
    bio: "James trained in Paris and brings European pastry techniques to our kitchen. He specializes in delicate pastries, macarons, and custom dessert creations.",
    image: "/james.jpg",
    social: {
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "Cake Decorator",
    bio: "Sophia is our artistic genius, turning cakes into edible works of art. With a background in fine arts, she creates stunning custom cakes for weddings and special occasions.",
    image: "/sophia.jpg",
    social: {
      instagram: "#",
      pinterest: "#",
    },
  },
  {
    id: 4,
    name: "Robert Miller",
    role: "Bread Baker",
    bio: "Robert is our sourdough expert who starts baking at 3 AM every morning. He's passionate about artisan breads and maintaining traditional baking methods.",
    image: "/robert.jpg",
    social: {
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 5,
    name: "Emma Davis",
    role: "Customer Experience Manager",
    bio: "Emma ensures every customer has a wonderful experience. She manages orders, consultations, and makes sure every special request is perfectly executed.",
    image: "/emma.jpg",
    social: {
      facebook: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 6,
    name: "Carlos Rodriguez",
    role: "Operations Manager",
    bio: "Carlos keeps our bakery running smoothly. He manages inventory, suppliers, and ensures we always have the freshest ingredients available.",
    image: "/carlos.jpg",
    social: {
      linkedin: "#",
    },
  },
];

export default function TeamSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our passionate team of bakers, decorators, and cake artists work
            together to create the delicious treats you love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Team Member Image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
                  style={{
                    backgroundImage: `url(${member.image})`,
                    backgroundColor: "#f3f4f6",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Team Member Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6">{member.bio}</p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {member.social.facebook && (
                    <Link
                      href={member.social.facebook}
                      className="text-gray-400 hover:text-primary transition-colors"
                      aria-label="Facebook"
                    >
                      <FaFacebook className="h-5 w-5" />
                    </Link>
                  )}
                  {member.social.twitter && (
                    <Link
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-primary transition-colors"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="h-5 w-5" />
                    </Link>
                  )}
                  {member.social.instagram && (
                    <Link
                      href={member.social.instagram}
                      className="text-gray-400 hover:text-primary transition-colors"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="h-5 w-5" />
                    </Link>
                  )}
                  {member.social.linkedin && (
                    <Link
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 md:p-12 border border-red-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Want to Join Our Team?
              </h3>
              <p className="text-gray-600">
                We&apos;re always looking for passionate bakers and pastry
                artists who share our love for creating delicious treats.
              </p>
            </div>
            <Link
              href="/careers"
              className="inline-block bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 whitespace-nowrap"
            >
              View Open Positions
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
