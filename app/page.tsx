import CakeShop from "@/components/CakeShop";
import Contact from "@/components/contact/Contact";
import AboutUs from "@/components/main/AboutUs";
import { Hero } from "@/components/main/Hero";
import Specialties from "@/components/main/Specialties";

export const metadata = {
  title: "Crème Russian Bakery",
  description: "Home of quality cakes and pastries",
};

export default function Home() {
  return (
    <>
      <div className="pt-20"></div>
      <Hero />
      <Specialties />
      <CakeShop />
      <AboutUs />
      <Contact />
    </>
  );
}
