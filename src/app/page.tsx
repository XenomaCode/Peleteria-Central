import HeroSection from "@/components/HeroSection";
import EspecializacionSection from "@/components/EspecializacionSection";
import ProductosRecognized from "@/components/ProductosRecognized";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <EspecializacionSection />
      <ProductosRecognized />
    </main>
  );
}
