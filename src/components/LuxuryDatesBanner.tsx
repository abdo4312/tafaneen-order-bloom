import { Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LuxuryDatesBanner = () => {
    return (
        <Link
            to="/category/dates"
            className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 p-6 md:p-8 group transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-[1.02] mx-3 mb-4"
        >
            {/* Animated Background Circles */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
                {/* Right Side - Text (RTL) */}
                <div className="flex-1 text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                        <span className="text-xs font-bold text-yellow-300 bg-yellow-300/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            عرض خاص
                        </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight drop-shadow-lg">
                        تمور فاخرة
                    </h3>

                    <p className="text-sm md:text-base text-white/95 font-bold mb-3">
                        جودة استثنائية • أسعار لا تُقاوم
                    </p>

                    <div className="inline-flex items-center gap-2 bg-white text-green-700 px-5 py-2.5 rounded-full font-black text-sm shadow-lg group-hover:bg-yellow-300 group-hover:text-green-800 transition-all duration-300 group-hover:scale-105">
                        <span>تسوق الآن</span>
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Left Side - Decorative Element */}
                <div className="hidden md:flex items-center justify-center">
                    <div className="relative">
                        {/* Rotating Ring */}
                        <div className="w-28 h-28 rounded-full border-4 border-white/30 border-dashed animate-spin" style={{ animationDuration: '8s' }} />
                        {/* Center Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>🌴</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Sparkles */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </Link>
    );
};
