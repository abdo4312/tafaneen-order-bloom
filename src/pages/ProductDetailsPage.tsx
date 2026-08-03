
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Heart, Share2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { mockProducts } from "@/data/mockData";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);

    // Find the actual product from the database
    const productData = mockProducts.find(p => p.id === id);

    // Fallback/Default values for missing fields in mock data
    const product = productData ? {
        ...productData,
        description: productData.name + " - منتج عالي الجودة مخصص للأدوات المدرسية والمكتبية، مصمم بعناية ليلبي احتياجاتك اليومية.",
        features: productData.isBestSeller ? ["الأكثر مبيعاً", "جودة ممتازة"] : ["جودة عالية", "مناسب للطلاب"],
        images: [productData.image],
        discount: productData.originalPrice
            ? Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100) + "%"
            : null
    } : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <div className="text-6xl">🔍</div>
                    <h2 className="text-xl font-bold text-gray-800">عفواً، المنتج غير موجود</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary text-white px-6 py-2 rounded-xl font-bold"
                    >
                        العودة للرئيسية
                    </button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        }, quantity);
        toast.success("تمت الإضافة للسلة بنجاح");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
            <Header title="تفاصيل المنتج" showBack={true} />

            <main className="flex-1">
                {/* Product Image Gallery */}
                <div className="bg-white relative">
                    <div className="h-[350px] w-full bg-white flex items-center justify-center p-8">
                        <img src={product.image} alt={product.name} className="max-h-full object-contain drop-shadow-lg" />
                    </div>

                    {/* Discount Badge */}
                    {product.discount && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white font-black px-3 py-1 rounded-full shadow-sm text-xs">
                            خصم {product.discount}
                        </div>
                    )}

                    {/* Action Buttons Overlay */}
                    <button className="absolute bottom-4 left-4 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="absolute bottom-4 right-4 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-500">
                        <Heart className="w-5 h-5" />
                    </button>
                </div>

                {/* Product Info Container */}
                <div className="bg-white rounded-t-[2rem] -mt-6 relative z-10 p-6 shadow-sm border-t border-gray-100 min-h-[500px]">
                    {/* Title */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-black text-gray-900 leading-tight mb-2 text-right">{product.name}</h1>
                            {product.isBestSeller && (
                                <span className="inline-block bg-yellow-400/20 text-yellow-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">الأكثر مبيعاً 🔥</span>
                            )}
                        </div>
                    </div>

                    {/* Price Row */}
                    <div className="flex items-end gap-3 mb-6 bg-gray-50 p-4 rounded-2xl">
                        <div className="flex-1 text-right">
                            {product.originalPrice && (
                                <span className="text-gray-400 text-sm font-bold line-through ml-2">{product.originalPrice.toFixed(2)} ج.م</span>
                            )}
                            <div className="flex items-center justify-end gap-1">
                                <span className="text-3xl font-black text-primary">{product.price.toFixed(2)}</span>
                                <span className="text-sm font-bold text-gray-500">ج.م</span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg active:scale-95 transition-transform"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg active:scale-95 transition-transform"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3 mb-6">
                        <h3 className="text-lg font-bold text-gray-800 text-right">الوصف</h3>
                        <p className="text-gray-500 text-sm leading-relaxed text-right">
                            {product.description}
                        </p>

                        {/* Features Pills */}
                        <div className="flex flex-wrap gap-2 mt-4 justify-end">
                            {product.features.map(f => (
                                <span key={f} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-xl border border-blue-100/50">
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span>أضف إلى السلة</span>
                    <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs mr-2">
                        {(product.price * quantity).toFixed(2)} ج.م
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
