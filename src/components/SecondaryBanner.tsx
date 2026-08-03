import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp } from 'lucide-react';

export const SecondaryBanner = () => {
    return (
        <div className="w-full py-4 px-4">
            {/* Modern Asymmetric Banner */}
            <Link
                to="/offers"
                className="block relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-red-600 to-orange-500 p-6 md:p-8 group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]"
            >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                    {/* Right Side - Text Content (RTL) */}
                    <div className="flex-1 text-right">
                        <div className="flex items-center justify-end gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                            <span className="text-xs font-bold text-yellow-300 bg-yellow-300/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                عرض محدود
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                            تمور فاخرة
                        </h3>

                        <p className="text-sm md:text-base text-white/90 font-medium mb-4">
                            خصومات حصرية تصل إلى <span className="text-yellow-300 font-black text-lg">50%</span>
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-full font-bold text-sm shadow-lg group-hover:bg-yellow-300 group-hover:text-primary transition-all duration-300 group-hover:scale-105">
                            <span>تسوق الآن</span>
                            <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Left Side - Decorative Element */}
                    <div className="hidden md:block">
                        <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border-4 border-white/20 group-hover:rotate-12 transition-transform duration-500">
                            <div className="text-6xl">🌟</div>
                        </div>
                    </div>
                </div>

                {/* Decorative Corner Accent */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-300/20 rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-tl-full" />
            </Link>
        </div>
    );
};
