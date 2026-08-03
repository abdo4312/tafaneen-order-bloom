import { useEffect } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { OffersCarousel } from "@/components/OffersCarousel";

const allOffers = [
  { id: 1, image: "/lovable-uploads/f33df929-57a0-4663-b698-3854907c88ed.png", alt: "عرض خصومات الأدوات المكتبية" },
  { id: 2, image: "/lovable-uploads/94a50846-0f45-464f-be83-47941edfe632.png", alt: "خصومات الكتب الخارجية" },
  { id: 3, image: "/lovable-uploads/80a77817-79a7-46da-9034-bacb10dc84fa.png", alt: "خصم الطباعة" },
  { id: 4, image: "/lovable-uploads/ad776173-075e-4f6d-b790-72e729481027.png", alt: "خدمات الكمبيوتر" },
  { id: 5, image: "/lovable-uploads/4f9d357f-2506-4ff3-8279-4e283391b6a7.png", alt: "الاستوديو والطباعة" },
];

const OffersPage = () => {
  useEffect(() => {
    document.title = "العروض الخاصة | تفانين";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24" dir="rtl">
      <Header title="العروض الخاصة" showBack={true} />

      <main className="space-y-6 py-4">
        {/* Carousel Section */}
        <section className="px-0">
          <div className="bg-white py-4 shadow-sm border-y border-gray-100">
            <OffersCarousel />
          </div>
        </section>

        {/* Offers Grid */}
        <section className="container mx-auto px-4">
          <h3 className="text-lg font-black text-gray-800 mb-4 text-right">أحدث الخصومات</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allOffers.map((o) => (
              <div key={o.id} className="group relative overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white aspect-[16/9] hover:shadow-md transition-all">
                <img
                  src={o.image}
                  alt={o.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-bold text-sm">{o.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Banner */}
        <section className="px-4">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center">
            <h4 className="text-primary font-black text-lg mb-2">تسوق عروضنا الآن!</h4>
            <p className="text-gray-600 text-sm">استمتع بتخفيضات حصرية تصل إلى 50% على مجموعة مختارة من المنتجات.</p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default OffersPage;

