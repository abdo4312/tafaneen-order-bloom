import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { CategoryHeroBanner } from "@/components/CategoryHeroBanner";
import { mockCategories, mockProducts } from "@/data/mockData";

const CategoryProductsPage = () => {
    const { categoryId } = useParams();
    const [activeSubId, setActiveSubId] = useState<string | null>(null);

    // Reset filter when switching between main categories
    useEffect(() => {
        setActiveSubId(null);
    }, [categoryId]);

    const departments = mockCategories.map(cat => ({
        id: parseInt(cat.id) || Math.random(),
        name: cat.name,
        slug: cat.id,
        img: cat.image
    }));

    const currentCategory = mockCategories.find(cat => cat.id === categoryId) || mockCategories[0];
    const currentDep = {
        name: currentCategory.name,
        slug: currentCategory.id,
        img: currentCategory.image
    };

    const subcategories = currentCategory.subcategories || [];

    // 🔥 تصفية المنتجات بذكاء بناءً على القسم الرئيسي والقسم الفرعي
    const filteredProducts = mockProducts.filter(product => {
        const matchesCategory = product.categoryId === categoryId;
        const matchesSubcategory = !activeSubId || product.subcategoryId === activeSubId;
        return matchesCategory && matchesSubcategory;
    });

    const displayProducts = filteredProducts;

    return (
        <div className="min-h-screen bg-background pb-24">
            <Header title={currentDep.name} showBack={true} />

            <main className="space-y-6 mt-4">
                {/* Main Departments Horizontal */}
                <section className="px-4">
                    <h3 className="text-primary font-black mb-3 text-right">الاقسام</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                        {departments.map(dep => (
                            <Link
                                to={`/category/${dep.slug}`}
                                key={dep.id}
                                onClick={() => setActiveSubId(null)}
                                className="min-w-[100px] flex flex-col items-center gap-2"
                            >
                                <div className={`w-20 h-16 rounded-2xl overflow-hidden border-2 transition-all ${dep.slug === categoryId ? 'border-primary shadow-sm' : 'border-gray-100'}`}>
                                    <img src={dep.img} alt={dep.name} className="w-full h-full object-cover" />
                                </div>
                                <span className={`text-[10px] font-bold ${dep.slug === categoryId ? 'bg-primary text-white' : 'text-gray-700'} px-3 py-1 rounded-full whitespace-nowrap`}>
                                    {dep.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Modern Identity Banner */}
                <CategoryHeroBanner
                    title={currentDep.name}
                    image={currentDep.img}
                    description="ارتقِ بتجربتك مع تشكيلة حصرية وفريدة مصممة خصيصاً لك."
                />

                {/* Sub Departments Horizontal Chips - Premium Design */}
                <section className="px-4">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/categories" className="text-xs font-bold text-primary hover:underline">عرض الكل</Link>
                        <h3 className="text-gray-800 font-black text-lg text-right">الأقسام الفرعية</h3>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none px-1">
                        {subcategories.map((sub, index) => {
                            const isActive = activeSubId === sub.id;
                            return (
                                <button
                                    key={sub.id}
                                    onClick={() => setActiveSubId(isActive ? null : sub.id)}
                                    className={`group relative flex flex-col items-center gap-2 min-w-[100px] transition-all duration-300 transform ${isActive ? 'scale-105' : 'hover:-translate-y-1'}`}
                                >
                                    <div className={`relative w-24 h-24 rounded-3xl overflow-hidden shadow-sm transition-all duration-500 border-4 ${isActive ? 'border-primary shadow-primary/30 ring-4 ring-primary/20' : 'border-white group-hover:shadow-xl'}`}>
                                        <img
                                            src={sub.image || currentDep.img}
                                            alt={sub.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity ${isActive ? 'opacity-40' : 'opacity-60 group-hover:opacity-40'}`} />

                                        {/* المؤشر النشط */}
                                        {isActive && (
                                            <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in duration-300">
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 w-full px-2">
                                        <div className={`backdrop-blur-md py-1.5 px-2 rounded-xl shadow-lg border transition-all duration-300 text-center ${isActive ? 'bg-primary border-primary text-white scale-105' : 'bg-white/90 border-white/50 text-gray-800'}`}>
                                            <span className="text-[10px] font-black truncate block">
                                                {sub.name}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Products Grid */}
                <section className="px-4">
                    {displayProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {displayProducts.map(product => (
                                <ProductCard key={product.id} product={{ ...product, id: String(product.id) }} variant="grid" />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <p className="font-bold">عفواً، لا توجد منتجات في هذا القسم حالياً</p>
                            <button
                                onClick={() => setActiveSubId(null)}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                عرض كل منتجات الفئة
                            </button>
                        </div>
                    )}
                </section>
            </main>

            <BottomNav />
        </div>
    );
};

export default CategoryProductsPage;
