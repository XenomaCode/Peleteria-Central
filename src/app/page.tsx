import HeroSection from "@/components/HeroSection";
import EspecializacionSection from "@/components/EspecializacionSection";
import ProductosRecognized from "@/components/ProductosRecognized";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellingProducts from "@/components/BestSellingProducts";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <EspecializacionSection />
      <ProductosRecognized />
      <CategoriesSection />
      <BestSellingProducts />
    </main>
  );
}
