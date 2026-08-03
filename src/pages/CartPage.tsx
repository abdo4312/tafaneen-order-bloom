
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCart();

    return (
        <div className="min-h-screen bg-background flex flex-col pb-40">
            <Header title="سلة المشتريات" showBack={true} />

            <main className="flex-1 p-4">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
                        <ShoppingBag className="w-20 h-20 mb-4 opacity-10" />
                        <p className="text-lg font-bold">سلتك فارغة حالياً</p>
                        <Link to="/" className="mt-4 text-primary font-bold hover:underline">
                            ابدأ التسوق الآن
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
                                {/* Image on Right (RTL) */}
                                <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.image || "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop"} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Details in Middle */}
                                <div className="flex-1 text-right space-y-1">
                                    <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                                    <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-primary font-black">{item.price.toFixed(2)}</span>
                                        <span className="text-[10px] font-bold text-gray-500">ج.م</span>
                                    </div>
                                </div>

                                {/* Controls on Left */}
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-1 text-red-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="flex items-center bg-gray-50 rounded-lg p-1 gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-primary shadow-sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                        <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-gray-400 shadow-sm"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Persistent Checkout Footer */}
            {items.length > 0 && (
                <div className="fixed bottom-[70px] left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
                    <div className="container max-w-lg mx-auto space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-primary">{getTotalPrice().toFixed(2)}</span>
                                <span className="text-xs font-bold text-gray-500">ج.م</span>
                            </div>
                            <span className="text-sm font-bold text-gray-600">اجمالي السلة</span>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-[0.98] transition-all">
                            اتمام الشراء
                        </button>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
};

export default CartPage;
