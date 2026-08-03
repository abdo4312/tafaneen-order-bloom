import { Percent, Sparkles } from 'lucide-react';

interface DiscountBannerProps {
    discount: string;
    index: number;
}

export const DiscountBanner = ({ discount, index }: DiscountBannerProps) => {
    // Different gradients for each banner
    const gradients = [
        'from-yellow-400 via-orange-400 to-red-500',
        'from-blue-400 via-purple-500 to-pink-500',
        'from-green-400 via-teal-500 to-cyan-500',
    ];

    const gradient = gradients[index % gradients.length];

    return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer`}>
            {/* Animated Background Circles */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute top-0 right-0 w-16 h-16 bg-white rounded-full blur-xl animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                />
                <div
                    className="absolute bottom-0 left-0 w-12 h-12 bg-white rounded-full blur-lg animate-pulse"
                    style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-base font-black text-white drop-shadow-lg">{discount}</span>
                <Percent className="w-4 h-4 text-white/90" />
            </div>

            {/* Floating Sparkle */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-white rounded-full animate-ping" />

            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
    );
};
