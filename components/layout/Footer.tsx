"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "#shop" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Custom Cakes", href: "#" },
    { name: "Wedding Cakes", href: "#" },
    { name: "Birthday Cakes", href: "#" },
    { name: "Catering", href: "#" },
  ];

  return (
    <footer className="bg-primary-100 text-ptext">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Image
              src="/creme_1.png"
              alt="Creme Russia Logo"
              width={150}
              height={50}
            />
            <p className="text-primary-dark mb-4">
              Crafting delicious memories with every bite. Premium cakes and
              pastries made fresh daily.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-primary-dark hover:text-red-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-primary-dark hover:text-red-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-primary-dark hover:text-red-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-primary-dark hover:text-red-500 transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-dark hover:text-red-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-primary-dark hover:text-red-500 transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-primary-dark">
              <li>Accra, Greater Accra</li>
              <li>Ghana</li>
              <li>Phone: +233 (0) 123 456 789</li>
              <li>Email: info@crèmerussianbakery.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-dark text-sm mb-4 md:mb-0">
              © {currentYear} Crème Russian Bakery. All rights reserved.
            </p>
            <p className="text-primary-dark text-sm flex items-center">
              Made with <FaHeart className="mx-2 text-red-500" /> for cake
              lovers everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
