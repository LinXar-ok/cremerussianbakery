import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import { HeroSection } from "@/components/layout/HeroSection";
import { MagicalBackground } from "@/components/layout/MagicalBackground";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = {
  title: "Contact Us - Crème Russian Bakery",
  description: "Get in touch with us for custom orders, questions, or feedback",
};

export default function ContactPage() {
  return (
    <>
      {/* <HeroSection
        title="Our Sweet Journey"
        subtitle="From a small home kitchen to becoming the heart of the community. Every cake tells a story of passion, dedication, and love."
        background="image"
        backgroundImage="/about-hero.jpg"
        overlayOpacity={0.4}
        height="medium"
        align="left"
        floatingElements={true}
        textColor="light"
        ctaButtons={{
          primary: {
            text: "Meet Our Team",
            href: "#team",
            icon: "👩‍🍳",
          },
        }}
      /> */}

      <MagicalBackground
        theme="celebration"
        intensity="light"
        floatingElements={true}
        sparkles={true}
        className="min-h-screen"
      >
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <SectionHeading
              title="Contact Us"
              subtitle=" We're here to help with all your baking needs"
              titleClassName="text-5xl"
              className="py-25"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              <div className="space-y-8">
                <div className="bg-red-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 text-ptext">
                    Quick Contact
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Phone:</strong> (555) 123-4567
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> orders@cremerussianbakery.com
                  </p>
                  <p className="text-gray-600">
                    <strong>Address:</strong> 123 Baker Street, Pastry Town
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 text-ptext">
                    Business Hours
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>7:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>7:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <FAQ />
            </div>
          </div>
        </div>
      </MagicalBackground>
    </>
  );
}
