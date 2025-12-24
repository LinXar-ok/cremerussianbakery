// import CustomCakeBuilder from "@/components/custom-cake/CustomCakeBuilder";
// import { SectionHeading } from "@/components/layout/SectionHeading";

// export const metadata = {
//   title: "Custom Cakes - MsRich Cakes and Pastries",
//   description:
//     "Design your dream cake with our custom cake builder. Perfect for birthdays, weddings, and all celebrations!",
// };

// export default function CustomCakesPage() {
//   return (
//     <div className="pt-24 pb-20 bg-linear-to-br from-primary-100 to-primary ">
//       <div className="max-w-7xl mx-auto px-4 py-20">
//         <SectionHeading
//           title="Design Your Dream Cake"
//           subtitle="Customize every detail to create the perfect cake for your special
//             occasion"
//           titleClassName="text-3xl lg:text-5xl"
//         />
//         <CustomCakeBuilder />
//       </div>
//     </div>
//   );
// }

import CustomCakeBuilder from "@/components/custom-cake/CustomCakeBuilder";
import { MagicalBackground } from "@/components/layout/MagicalBackground";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = {
  title: "Custom Cakes - Crème Russian Bakery",
  description:
    "Design your dream cake with our custom cake builder. Perfect for birthdays, weddings, and all celebrations!",
};

export default function CustomCakesPage() {
  return (
    <>
      {/* <HeroSection
        title="Design Your Dream Cake"
        subtitle="Create a masterpiece that's as unique as your celebration. Every detail matters, and we're here to bring your vision to life."
        background="gradient"
        gradient="from-purple-500 via-pink-500 to-rose-500"
        pattern="sprinkles"
        height="medium"
        align="center"
        floatingElements={true}
        sparkleEffects={true}
        textColor="light"
        ctaButtons={{
          primary: {
            text: "Start Designing",
            href: "#builder",
            icon: "🎨",
          },
          secondary: {
            text: "View Gallery",
            href: "/gallery",
            icon: "📸",
          },
        }}
      /> */}

      <MagicalBackground
        theme="cake"
        intensity="medium"
        floatingElements={true}
        sparkles={true}
        className="min-h-screen"
      >
        <div className="relative z-10 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <SectionHeading
              title="Design Your Dream Cake"
              subtitle="Customize every detail to create the perfect cake for your special
              occasion"
              titleClassName="text-4xl md:text-6xl"
              subtitleClassName="text-xl max-w-3xl"
            />

            {/* Decorative cake icon under heading */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="w-16 h-16 bg-linear-to-br from-primary-100 to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-3xl text-white">🎂</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              <CustomCakeBuilder />
            </div>

            {/* Decorative footer note */}
            <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-primary-100 to-amber-50 rounded-full shadow-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-600 font-medium">
                  🎉 Every custom cake includes free consultation with our
                  pastry chefs
                </p>
                <div className="text-xl">👨‍🍳</div>
              </div>
            </div>
          </div>
        </div>
      </MagicalBackground>
    </>
  );
}
