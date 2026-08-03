
import { Header } from "@/components/Header";
import { BannerCarousel } from "@/components/BannerCarousel";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header isHome={true} />
      <main className="space-y-2">
        <BannerCarousel />
        <Categories />
        <FeaturedProducts />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
