
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
    // Mock favorite products - in a real app this would come from a context or database
    const favorites = [
        { id: "3", name: "مجموعة أدوات هندسية فاخرة", price: 150.00, originalPrice: 180.00, discount: "16%", image: "https://images.unsplash.com/photo-1542319630-55fb7f7c944a?q=80&w=2070&auto=format&fit=crop" },
        { id: "4", name: "دفتر ملاحظات سلك", price: 45.00, originalPrice: 50.00, discount: "10%", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24" dir="rtl">
            <Header title="المفضلة" showBack={true} />

            <main className="container mx-auto px-4 py-8">
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favorites.map(product => (
                            <ProductCard key={product.id} product={product} variant="grid" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <Heart className="w-12 h-12 text-primary opacity-20" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">قائمة المفضلة فارغة</h2>
                        <p className="text-gray-500 mb-8 max-w-xs">احفظ منتجاتك المفضلة هنا للوصول إليها لاحقاً بكل سهولة.</p>
                        <Link
                            to="/"
                            className="bg-primary text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-primary-dark transition-all"
                        >
                            ابدأ التسوق
                        </Link>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
};

export default FavoritesPage;
