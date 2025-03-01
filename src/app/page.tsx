import HeroSection from "@/components/HeroSection";
import EspecializacionSection from "@/components/EspecializacionSection";
import ProductosRecognized from "@/components/ProductosRecognized";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellingProducts from "@/components/BestSellingProducts";
import VideoARSection from "@/components/VideoARSection";
import BrandsSection from "@/components/BrandsSection";
import AboutUsSection from "@/components/AboutUsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <EspecializacionSection />
      <ProductosRecognized />
      <CategoriesSection />
      <BestSellingProducts />
      <VideoARSection />
      <BrandsSection />
      <AboutUsSection />
    </main>
  );
}
