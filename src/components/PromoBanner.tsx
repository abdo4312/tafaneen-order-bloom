import { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const promos = [
    {
        id: 1,
        title: "موسم المدارس",
        subtitle: "خصومات تصل إلى ٥٠٪",
        color: "bg-blue-600",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "ألوان مائية",
        subtitle: "اشتري ٢ واحصل على ١ مجاناً",
        color: "bg-purple-600",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
    }
];

export const PromoBanner = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);

    return (
        <div className="w-full py-4 space-y-2">
            <div className="flex items-center justify-between px-4 mb-2">
                <h3 className="text-sm font-black text-primary">عروض خاصة</h3>
            </div>

            {/* Container for the carousel */}
            <div className="overflow-hidden cursor-grab active:cursor-grabbing pb-6" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-4 rtl:ml-0 rtl:-mr-4">
                    {/* 
             RTL Note: embla-carousel usually handles direction automatically if dir="rtl" is set on body. 
             If not, we might need direction:rtl config. 
             Assuming body has dir="rtl" or standard LTR structure with CSS RTL flipping.
          */}
                    {promos.map((promo) => (
                        <div className="flex-[0_0_85%] md:flex-[0_0_50%] min-w-0 pl-4 rtl:pl-0 rtl:pr-4" key={promo.id}>
                            <div className="relative h-40 md:h-64 rounded-2xl overflow-hidden shadow-md mx-1 group cursor-pointer transition-transform hover:scale-[1.01]">
                                {/* Background Image */}
                                <img
                                    src={promo.image}
                                    alt={promo.title}
                                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay - Stronger on sides for text */}
                                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/40 to-transparent opacity-90" />

                                {/* Content */}
                                <div className="relative z-20 h-full flex flex-col justify-center items-start px-6 text-right w-full">
                                    <div className="flex flex-col items-start w-full max-w-[80%] md:max-w-[70%]">
                                        <span className="inline-block px-3 py-1 mb-2 text-[10px] md:text-xs font-bold text-white bg-red-600/90 backdrop-blur-sm rounded-full shadow-sm animate-pulse border border-white/20">
                                            لفترة محدودة
                                        </span>
                                        <h4 className="text-xl md:text-3xl font-black text-white mb-2 drop-shadow-lg leading-tight">
                                            {promo.title}
                                        </h4>
                                        <p className="text-xs md:text-sm text-gray-100 font-medium mb-4 drop-shadow-md line-clamp-2">
                                            {promo.subtitle}
                                        </p>
                                        <Button size="sm" className="h-8 md:h-9 text-xs md:text-sm bg-white text-black hover:bg-gray-100 font-bold rounded-full px-5 shadow-xl transform transition-all hover:scale-105 active:scale-95 group-hover:bg-primary group-hover:text-white border-0">
                                            تصفح العرض <ChevronRight className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
