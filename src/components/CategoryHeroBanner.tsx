import { ArrowLeft, Sparkles } from 'lucide-react';

interface CategoryHeroBannerProps {
    title: string;
    image: string;
    description?: string;
}

export const CategoryHeroBanner = ({ title, image, description }: CategoryHeroBannerProps) => {
    return (
        <div className="mx-4 mb-8">
            <div className="relative h-48 md:h-64 rounded-[2.5rem] overflow-hidden group shadow-2xl">
                {/* Main Background Image */}
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-8 md:px-12">

                    {/* Animated Particles/Glowing blobs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-[80px] animate-pulse" />
                    <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-yellow-400/20 rounded-full blur-[60px] animate-pulse delay-700" />

                    {/* Text Content */}
                    <div className="relative z-10 text-right w-full flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
                            <span className="text-[10px] md:text-xs font-black text-white tracking-widest uppercase">مجموعة المتميزين</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-2xl">
                            {title}
                        </h2>

                        {description && (
                            <p className="text-white/80 text-sm md:text-lg font-bold mb-4 max-w-xs md:max-w-md line-clamp-2">
                                {description}
                            </p>
                        )}

                        <button className="flex items-center gap-2 bg-primary hover:bg-white hover:text-primary text-white px-6 py-2.5 rounded-2xl font-black text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl">
                            <span>اكتشف التشكيلة</span>
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Decorative Glass Ring */}
                <div className="absolute top-1/2 -left-10 w-40 h-40 border-[20px] border-white/5 rounded-full blur-sm pointer-events-none" />

                {/* Shine/Flare Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full pointer-events-none" />
            </div>
        </div>
    );
};
