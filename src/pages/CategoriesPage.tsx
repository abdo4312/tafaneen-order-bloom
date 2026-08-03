
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Book, Pen, Ruler, Palette, Sticker, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

const mainCategories = [
  { id: 1, name: "نوت بوك", icon: Book, slug: "notebooks" },
  { id: 2, name: "كتب", icon: Book, slug: "books" },
  { id: 3, name: "ادوات هندسيه", icon: Ruler, slug: "geometry" },
  { id: 4, name: "تلوين", icon: Palette, slug: "coloring" },
  { id: 5, name: "استيكرات", icon: Sticker, slug: "stickers" },
  { id: 6, name: "اقلام", icon: Pen, slug: "pens" },
];

const subCategoriesData: Record<number, any[]> = {
  1: [{ id: 101, name: "نوت بوك سلك" }, { id: 102, name: "نوت بوك كشكول" }],
  6: [{ id: 601, name: "رصاص", image: null }, { id: 602, name: "جاف", image: null }],
  // Add more as needed
};

const CategoriesPage = () => {
  const [selectedId, setSelectedId] = useState(6); // Default to "Pens" as per Image 0 example

  useEffect(() => {
    document.title = "الأقسام | تفانين";
  }, []);

  const selectedCategory = mainCategories.find(c => c.id === selectedId);
  const selectedCategorySubs = subCategoriesData[selectedId] || [];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      <Header title="الاقسام" showBack={true} />

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar (Right side in RTL) */}
        <aside className="w-24 bg-gray-50 border-l border-gray-100 overflow-y-auto flex-shrink-0">
          <div className="flex flex-col">
            {mainCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
                className={`flex flex-col items-center justify-center py-4 px-1 gap-2 border-b border-gray-100 transition-all ${selectedId === cat.id
                  ? "bg-white border-l-4 border-l-primary text-primary"
                  : "text-gray-400 grayscale"
                  }`}
              >
                <div className={`p-2 rounded-xl ${selectedId === cat.id ? 'bg-primary/10' : 'bg-transparent'}`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold text-center leading-tight`}>{cat.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area (Left side in RTL) */}
        <div className="flex-1 bg-white overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-primary">
              {selectedCategory?.name}
            </h2>
            <Link to={`/category/${selectedCategory?.slug}`} className="bg-primary/5 px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors">
              <ShoppingBasket className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-primary">تسوق الأن</span>
            </Link>
          </div>

          {selectedCategorySubs.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {selectedCategorySubs.map((sub) => (
                <div key={sub.id} className="flex flex-col items-center group cursor-pointer">
                  <div className="aspect-square w-full bg-gray-50 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all flex items-center justify-center overflow-hidden mb-2 shadow-sm">
                    {/* Placeholder for subcategory image */}
                    <div className="text-gray-300 flex flex-col items-center gap-1">
                      {selectedCategory && <selectedCategory.icon className="w-8 h-8 opacity-20" />}
                      <span className="text-[8px] font-bold uppercase">Tafaneen</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 text-center">{sub.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-300">
              <ShoppingBasket className="w-12 h-12 mb-2 opacity-10" />
              <p className="text-sm font-medium">لا توجد أقسام فرعية حالياً</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CategoriesPage;
