import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";
import { HeroSection } from "@/components/layout/HeroSection";
import { MagicalBackground } from "@/components/layout/MagicalBackground";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = {
  title: "About Us - Crème Russian Bakery",
  description: "Learn about our story, values, and team",
};

export default function AboutPage() {
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
        theme="elegant"
        intensity="medium"
        floatingElements={false}
        sparkles={true}
        className="min-h-screen"
      >
        <div className="pt-20">
          {/* Hero Section */}
          <div className="bg-linear-to-r  py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <SectionHeading
                title="Our Story"
                subtitle="From a family kitchen to your table - baking with passion since
                2015"
                titleClassName="text-4xl md:text-6xl"
                subtitleClassName="text-xl max-w-3xl"
                underlineType="wavy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  How It All Began
                </h2>
                <p className="text-gray-600 mb-4 text-lg">
                  Crème Russian Bakery was born from Maria Richardson&apos;s
                  childhood memories of baking with her grandmother. What
                  started as weekend farmers market stalls quickly grew into a
                  community favorite.
                </p>
                <p className="text-gray-600 mb-6 text-lg">
                  Today, we maintain that same homemade quality while serving
                  hundreds of happy customers every week. Our commitment to
                  traditional recipes and innovative flavors keeps our community
                  coming back for more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow border">
                    <div className="text-3xl font-bold text-primary">8+</div>
                    <div className="text-gray-600">Years of Experience</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow border">
                    <div className="text-3xl font-bold text-primary">10k+</div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow border">
                    <div className="text-3xl font-bold text-primary">50+</div>
                    <div className="text-gray-600">Community Events</div>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-cover bg-center bg-[url('/bakery-interior.jpg')]">
                  <div className="absolute inset-0 bg-linear-to-r from-red-600/10 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-xl font-bold">
                    Our First Location
                  </h3>
                  <p className="text-white/80">
                    The humble beginning of our bakery journey
                  </p>
                </div>
              </div>
            </div>

            <ValuesSection />
            <TeamSection />
          </div>
        </div>
      </MagicalBackground>
    </>
  );
}
