import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image?: string | null;
}



const SectionHeader = ({ title, link, bgColor = "bg-transparent" }: { title: string, link: string, bgColor?: string }) => (
  <div className={`flex items-center justify-between py-3 px-4 ${bgColor} rounded-t-xl`}>
    <h3 className="text-sm font-black text-primary">{title}</h3>
    <Link to={link} className="text-xs font-bold text-yellow-500 hover:underline">عرض الكل</Link>
  </div>
);

export const FeaturedProducts = () => {
  const mockProducts = [
    { id: 1, name: "منتج ٣", price: 190.00, originalPrice: 200.0, discount: "5.0%", image: null },
    { id: 2, name: "منتج ٤", price: 111.60, originalPrice: 120.0, discount: "7.0%", image: null },
    { id: 3, name: "منتج ٥", price: 81.00, originalPrice: 90.0, discount: "10.0%", image: null },
    { id: 4, name: "منتج ٦", price: 45.00, originalPrice: 50.0, discount: "10.0%", image: null },
  ];

  return (
    <div className="space-y-6 pb-4">
      {/* Special Offers Products */}
      <section>
        <SectionHeader title="عروض خاصة" link="/offers" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 pb-4">
          {mockProducts.map(p => <ProductCard key={`special-${p.id}`} product={p} variant="grid" />)}
        </div>
      </section>

      {/* Luxury Dates Section */}
      <section className="bg-white">
        <SectionHeader title="تمور فاخره" link="/category/dates" bgColor="bg-[#F0FFF4]" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 pb-4">
          {mockProducts.map(p => <ProductCard key={`date-${p.id}`} product={p} variant="grid" />)}
        </div>
      </section>

      {/* Offers & Discounts Section */}
      <section>
        <SectionHeader title="عروض وخصومات" link="/offers" />

        <div className="px-4 mb-2">
          <h4 className="text-xs font-black text-gray-500 text-right">الأكثر مبيعاً حالياً</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 pb-4">
          {mockProducts.map(p => <ProductCard key={`offer-${p.id}`} product={p} variant="grid" />)}
        </div>
      </section>
    </div>
  );
};