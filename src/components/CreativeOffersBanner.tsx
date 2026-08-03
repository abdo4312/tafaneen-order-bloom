import { Rocket, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreativeOffersBanner = () => {
    return (
        <div className="px-3 h-full w-full">
            <Link
                to="/offers"
                className="block relative w-full h-full overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-red-600 to-orange-600 group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(206,32,40,0.3)]"
            >
                {/* Abstract Artistic Background */}
                <div className="absolute inset-0 overflow-hidden">
                {/* Animated Gradient Blob */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-yellow-400/30 to-orange-600/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-white/20 to-yellow-400/20 rounded-full blur-[80px] animate-pulse delay-1000" />

                {/* Floating Decorative Shapes */}
                <div className="absolute top-10 left-10 w-4 h-4 border-2 border-white/20 rounded-full animate-bounce" />
                <div className="absolute bottom-12 right-20 w-3 h-3 bg-yellow-400/30 rounded-full animate-ping" />
                <div className="absolute top-1/2 right-4 w-6 h-1 bg-white/10 rounded-full rotate-45" />
            </div>

            {/* Main Content Layout */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full p-8 md:p-12">

                {/* Left Side: Visual "Sticker" Look */}
                <div className="hidden md:flex relative w-1/3 items-center justify-center">
                    <div className="relative transform -rotate-12 transition-transform duration-500 group-hover:rotate-0">
                        {/* Main Product Image Container */}
                        <div className="w-40 h-40 bg-white p-2 rounded-2xl shadow-2xl rotate-3 transform transition-all group-hover:-translate-y-4">
                            <img
                                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
                                className="w-full h-full object-cover rounded-xl"
                                alt="Creative"
                            />
                        </div>
                        {/* Overlay Sticker */}
                        <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-xl font-black text-xs shadow-xl rotate-12 animate-pulse">
                            عروض نار! 🔥
                        </div>
                        {/* Abstract Ring */}
                        <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full -m-6 animate-spin-slow" />
                    </div>
                </div>

                {/* Right Side: Text & CTA (RTL) */}
                <div className="flex-1 text-right flex flex-col items-center md:items-end w-full">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce" />
                        <span className="text-sm font-black text-yellow-300 bg-yellow-300/20 px-4 py-1.5 rounded-full border border-yellow-300/30">
                            تخفيضات كبرى
                        </span>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-none tracking-tight">
                        عالم <span className="text-yellow-300">الخصومات</span> الإبداعية
                    </h3>

                    <p className="text-white/90 text-base md:text-xl font-medium mb-8 max-w-sm">
                        أقوى العروض على الأدوات والمكتبات.. اطلب الآن قبل نفاذ الكمية!
                    </p>

                    <div className="flex items-center gap-4">
                        <button className="relative overflow-hidden bg-white hover:bg-yellow-300 text-primary hover:text-primary px-8 py-3.5 rounded-[1.5rem] font-black text-sm md:text-base transition-all duration-300 group/btn shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                            <span className="relative z-10 flex items-center gap-2">
                                سجل الدخول للعروض
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <div className="flex -space-x-3 space-x-reverse">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 border-2 border-primary rounded-full bg-gray-600 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                </div>
                            ))}
                            <div className="w-10 h-10 border-2 border-primary rounded-full bg-yellow-400 text-primary flex items-center justify-center text-[10px] text-white font-black z-10">
                                +٥٠
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Identity Shine */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </Link>
        </div>
    );
};
