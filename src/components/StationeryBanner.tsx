import { Sparkles, ArrowLeft, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StationeryBanner = () => {
    return (
        <div className="px-3 h-full w-full">
            <Link
                to="/categories"
                className="block relative w-full h-full overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-red-600 to-orange-600 group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]"
            >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-400 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Decorative Stationery Items */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Pencil */}
                <div className="absolute top-10 left-10 text-6xl opacity-30 animate-bounce" style={{ animationDuration: '3s' }}>✏️</div>
                {/* Floating Notebook */}
                <div className="absolute bottom-10 right-20 text-5xl opacity-30 animate-bounce" style={{ animationDelay: '1s' }}>📓</div>
                {/* Floating Palette */}
                <div className="absolute top-1/2 right-10 text-4xl opacity-30 animate-bounce" style={{ animationDelay: '2s' }}>🎨</div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-between h-full p-8">
                {/* Right Side - Text (RTL) */}
                <div className="flex-1 text-right">
                    <div className="flex items-center justify-end gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                        <span className="text-xs font-bold text-yellow-300 bg-yellow-300/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            مجموعة جديدة
                        </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight drop-shadow-lg">
                        أدوات مكتبية <span className="text-yellow-300">فاخرة</span>
                    </h3>

                    <p className="text-base md:text-lg text-white/95 font-bold mb-4">
                        جودة استثنائية • أسعار لا تُقاوم • تشكيلة متنوعة
                    </p>

                    <div className="flex items-center justify-end gap-4 mb-4">
                        <div className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold">
                            <Palette className="w-4 h-4 inline ml-2" />
                            ألوان وأشكال متنوعة
                        </div>
                        <div className="bg-yellow-400/20 backdrop-blur-xl border border-yellow-400/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-bold">
                            جودة عالية
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-black text-sm shadow-lg group-hover:bg-yellow-300 group-hover:text-primary transition-all duration-300 group-hover:scale-105">
                        <span>تسوق الآن</span>
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Left Side - Visual Elements */}
                <div className="hidden md:flex items-center justify-center">
                    <div className="relative">
                        {/* Rotating Ring */}
                        <div className="w-32 h-32 rounded-full border-4 border-white/30 border-dashed animate-spin" style={{ animationDuration: '8s' }} />
                        {/* Center Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-7xl animate-bounce" style={{ animationDuration: '2s' }}>📚</div>
                        </div>
                        {/* Floating Badges */}
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-3 py-1 rounded-full font-black text-xs shadow-xl animate-pulse">
                            جديد
                        </div>
                        <div className="absolute -bottom-2 -left-2 bg-white text-primary px-3 py-1 rounded-full font-black text-xs shadow-xl animate-pulse" style={{ animationDelay: '1s' }}>
                            خاص
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Sparkles */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
        </Link>
        </div>
    );
};
