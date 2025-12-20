// import ProductFilters from "@/components/products/ProductFilters";
// import ProductGrid from "@/components/products/ProductGrid";
// import { FilterProvider } from "@/components/products/ProductFilterContext";

// export const metadata = {
//   title: "Our Products - MsRich Cakes and Pastries",
//   description: "Browse our selection of cakes, pastries, and baked goods",
// };

// export default function ProductsPage() {
//   return (
//     <FilterProvider>
//       <div className="pt-24 pb-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-roaster text-secondary my-4">
//               Our Delicious Creations
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Freshly baked daily with the finest ingredients
//             </p>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Add mobile-hidden class */}
//             <aside className="lg:w-1/4 hidden lg:block">
//               <ProductFilters />
//             </aside>

//             <main className="lg:w-3/4">
//               <ProductGrid />
//             </main>
//           </div>
//         </div>
//       </div>
//     </FilterProvider>
//   );
// }

import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { FilterProvider } from "@/components/products/ProductFilterContext";
import { MagicalBackground } from "@/components/layout/MagicalBackground";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata = {
  title: "Our Products - Crème Russian Bakery",
  description: "Browse our selection of cakes, pastries, and baked goods",
};

export default function ProductsPage() {
  return (
    <FilterProvider>
      <MagicalBackground
        theme="bakery"
        intensity="light"
        floatingElements={true}
        sparkles={false}
        className="min-h-screen"
      >
        <div className="relative z-10 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              title="Our Delicious Creations"
              subtitle="Freshly baked daily with the finest ingredients"
              titleClassName="text-3xl lg:text-5xl"
              className="py-20"
            />

            <div className="flex flex-col lg:flex-row gap-8 mt-8">
              {/* Filters sidebar - hidden on mobile */}
              <aside className="lg:w-1/4 hidden lg:block">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
                  <ProductFilters />
                </div>
              </aside>

              {/* Main content */}
              <main className="lg:w-3/4">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
                  <ProductGrid />
                </div>
              </main>
            </div>

            {/* Mobile filter toggle */}
            <div className="lg:hidden mt-8">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
                <ProductFilters />
              </div>
            </div>
          </div>
        </div>
      </MagicalBackground>
    </FilterProvider>
  );
}
