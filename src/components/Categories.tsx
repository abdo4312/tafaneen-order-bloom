import { Link } from "react-router-dom";

// Categories with creative modern design
const categories = [
  {
    id: 1,
    name: "نوت بوك",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=300&auto=format&fit=crop",
    gradient: "from-orange-400/20 via-amber-300/20 to-yellow-200/20",
    accentColor: "border-orange-400/30",
    path: "/category/notebooks"
  },
  {
    id: 2,
    name: "كتب",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop",
    gradient: "from-emerald-400/20 via-green-300/20 to-lime-200/20",
    accentColor: "border-emerald-400/30",
    path: "/category/books"
  },
  {
    id: 3,
    name: "ادوات هندسيه",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300&auto=format&fit=crop",
    gradient: "from-rose-400/20 via-pink-300/20 to-fuchsia-200/20",
    accentColor: "border-rose-400/30",
    path: "/category/geometry"
  },
  {
    id: 4,
    name: "تلوين",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300&auto=format&fit=crop",
    gradient: "from-violet-400/20 via-purple-300/20 to-indigo-200/20",
    accentColor: "border-violet-400/30",
    path: "/category/coloring"
  },
  {
    id: 5,
    name: "استيكرات",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=300&auto=format&fit=crop",
    gradient: "from-pink-400/20 via-rose-300/20 to-red-200/20",
    accentColor: "border-pink-400/30",
    path: "/category/stickers"
  },
  {
    id: 6,
    name: "اقلام",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=300&auto=format&fit=crop",
    gradient: "from-sky-400/20 via-cyan-300/20 to-blue-200/20",
    accentColor: "border-sky-400/30",
    path: "/category/pens"
  },
];

export const Categories = () => {
  // عرض أول 4 أقسام فقط
  const featuredCategories = categories.slice(0, 4);
  
  return (
    <section className="py-6 bg-gradient-to-b from-background via-gray-50/30 to-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/categories"
            className="text-xs font-bold text-primary hover:text-primary/80 transition-all px-4 py-2 bg-primary/5 rounded-full hover:bg-primary/10 hover:scale-105"
          >
            عرض الكل
          </Link>
          <h2 className="text-lg font-black text-gray-800 tracking-tight">تسوق حسب الفئة</h2>
        </div>

        {/* Grid Layout: 2x2 على الموبايل، صف واحد على الديسكتوب */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto md:max-w-full">
          {featuredCategories.map((category, index) => (
            <Link
              key={category.id}
              to={category.path}
              className="group flex flex-col items-center"
            >
              {/* Organic Blob Shape with Glassmorphism */}
              <div className={`
                relative w-full aspect-square mx-auto
                bg-gradient-to-br ${category.gradient}
                backdrop-blur-xl
                overflow-hidden
                transition-all duration-500 ease-out
                group-hover:scale-105 group-hover:-translate-y-1
                border-2 ${category.accentColor}
                shadow-md shadow-black/5
                group-hover:shadow-xl group-hover:shadow-primary/15
              `}
                style={{
                  borderRadius: index % 3 === 0
                    ? '60% 40% 30% 70% / 60% 30% 70% 40%'
                    : index % 3 === 1
                      ? '30% 60% 70% 40% / 50% 60% 30% 60%'
                      : '40% 60% 60% 40% / 60% 40% 60% 40%',
                }}>

                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Product Image with Mask */}
                <div className="absolute inset-2 md:inset-3 overflow-hidden"
                  style={{
                    borderRadius: index % 3 === 0
                      ? '55% 45% 35% 65% / 55% 35% 65% 45%'
                      : index % 3 === 1
                        ? '35% 55% 65% 45% / 45% 55% 35% 55%'
                        : '45% 55% 55% 45% / 55% 45% 55% 45%',
                  }}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Floating Particles Effect */}
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" />
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Category Name with Modern Typography */}
              <span className="mt-3 text-xs md:text-sm font-black text-gray-700 text-center group-hover:text-primary transition-all duration-300">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
