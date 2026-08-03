
import { Heart, ShoppingCart, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export interface Product {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image?: string | null;
}

interface ProductCardProps {
    product: Product;
    variant?: "default" | "grid";
}

export const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.image || undefined
        });
        toast.success("تمت الإضافة للسلة");
    };

    return (
        <Link to={`/product/${product.id}`} className={`${variant === "default" ? "min-w-[160px]" : "w-full"} block h-full`}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col p-2 h-full hover:shadow-md transition-all group">
                {/* Image Area */}
                <div className="relative aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                    {/* Discount Badge */}
                    {product.discount && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-[10px] font-black px-2 py-0.5 rounded-md text-white z-10 shadow-sm">
                            {product.discount} خصم
                        </div>
                    )}

                    {/* Heart Toggle */}
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="absolute top-2 left-2 text-gray-300 hover:text-red-500 transition-colors z-20 p-1"
                    >
                        <Heart className="w-5 h-5" />
                    </button>

                    {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                        <div className="flex flex-col items-center text-gray-300">
                            <ImageOff className="w-8 h-8 mb-1" />
                            <span className="text-[10px]">لا يوجد صورة</span>
                        </div>
                    )}
                </div>

                {/* Info Area */}
                <div className={`text-right flex flex-col flex-1 justify-between gap-1 px-1`}>
                    <div className={variant === "default" ? "text-center" : "text-right"}>
                        <h4 className="text-sm font-black text-gray-800 line-clamp-2">{product.name}</h4>
                    </div>

                    <div className={`flex ${variant === "grid" ? "items-center justify-between" : "flex-col items-center"} w-full mt-2`}>
                        {variant === "grid" && (
                            <button
                                onClick={handleAddToCart}
                                className="bg-primary p-2 rounded-xl text-white shadow-sm hover:bg-primary-dark transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        )}

                        <div className={`flex flex-col ${variant === "grid" ? "items-end" : "items-center"}`}>
                            {product.originalPrice && (
                                <span className="text-[10px] text-gray-300 line-through">
                                    {product.originalPrice.toFixed(0)} ج.م
                                </span>
                            )}
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm font-black text-primary">{product.price.toFixed(0)}</span>
                                <span className="text-[10px] font-bold text-gray-500">ج.م</span>
                            </div>
                        </div>

                        {variant === "default" && (
                            <button
                                onClick={handleAddToCart}
                                className="mt-2 w-full bg-gray-50 text-primary py-1 rounded-lg text-xs font-bold hover:bg-primary/5 transition-colors border border-primary/10"
                            >
                                أضف للسلة
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};
